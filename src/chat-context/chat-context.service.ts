import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PromptTemplate } from 'langchain/prompts';
import { Ollama } from 'langchain/llms/ollama';
import { RetrievalQAChain } from 'langchain/chains';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OllamaEmbeddings } from 'langchain/embeddings/ollama';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url";
import { compile } from "html-to-text";
import { readdirSync, readFileSync } from 'fs';
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { CommonConfigDataStructure } from 'common/interfaces/project-assistant-dto';
import { FigmaFileLoader } from "langchain/document_loaders/web/figma";

@Injectable()
export class ChatContextService implements OnApplicationBootstrap {
  chain;
  vectorStore;
  promptTemplate = new PromptTemplate({
    template: `analize this english text: {context} and make 10 questions for quiz about this text with answer variants: {question}`,
    inputVariables: ['context', 'question'],
  });
  embeddingModel = new OllamaEmbeddings({
    baseUrl: 'http://localhost:11434',
    model: 'llama2:13b',
  });
  model = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'llama2:13b',
  });
  textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  async initConfigFile() {
    await this.useCommonConfigFile('5s Control');
  }

  async onApplicationBootstrap() {
    console.log('app bootstraped')
    await this.useCommonConfigFile('5s Control');
  }

  getListOfProjects() {
    console.log(readdirSync('./src/uploads/ChatGuru'))
    return readdirSync('./src/uploads/ChatGuru');
  }

  async useCommonConfigFile(projectName: string) {
    console.log('loading config')
    let projectConfig = JSON.parse(readFileSync('./src/uploads/ChatGuru/5sControl/config.txt', 'utf-8'))
    this.promptTemplate = new PromptTemplate({
      template: projectConfig.behaviourTemplate,
      inputVariables: ['context', 'question'],
    });

    await this.useMultiLoader(projectConfig.extraInfoForChatPath);
    for (const link of projectConfig.youtubeVideoLinks) {
      await this.useYoutubeVideo(link)
    }
    for (const link of projectConfig.youtubeVideoLinks) {
      await this.useYoutubeVideo(link)
    }
    for (const repo of projectConfig.gitHubRepositories) {
      await this.useGitHubProject(repo.link, repo.branch)
    }
    for (const figma of projectConfig.figmaProject) {
      await this.useFigmaProjest(figma.fileKey, figma.nodeIds)
    }
    console.log('config uploaded')
  }

  private async useGitHubProject(projectUrl, branchName) {
    const loader = new GithubRepoLoader(
      projectUrl,
      {
        branch: branchName,
        recursive: false,
        unknown: "warn",
        maxConcurrency: 5, // Defaults to 2
        ignorePaths: ['e2e']
      }
    );
    await this.proccessDocuments(loader);
  }

  private async useFigmaProjest(fileKey: string, nodeIds: string[]) {
      const loader = new FigmaFileLoader({
        accessToken: 'figd_iPaxVO8v1-A2a0cV_xOG-YM3VHH3fJbmNE6FSO4a',
        fileKey,
        nodeIds,
      })
      this.proccessDocuments(loader)
  }

  private async useYoutubeVideo (url: string) {
    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });
   await this.proccessDocuments(loader);
  }

  private async useMultiLoader(folderPath: string) {
    if(!folderPath) return
    const loader = new DirectoryLoader(
      folderPath,
      {
        ".pdf": (path) => new PDFLoader(path),
        ".txt": (path) => new TextLoader(path), 
        ".csv": (path) => new CSVLoader(path), 
        ".docx": (path) => new DocxLoader(path), 
      }
    );
   await this.proccessDocuments(loader);
  }

  // private async useHTMLPage(link: string) {
  //   const compiledConvert = compile({ wordwrap: 130 })
  //   const loader = new RecursiveUrlLoader(link, {
  //     extractor: compiledConvert,
  //     maxDepth: 5,
  //   });
  //   this.proccessDocuments(loader);
  // }

  // private async useCustomHTMLPage(link: string, depth: number) {
  //   const compiledConvert = compile({ wordwrap: 130 })
  //   const loader = new RecursiveUrlLoader(link, {
  //     extractor: compiledConvert,
  //     maxDepth: depth,
  //   });
    
  //   await this.proccessDocuments(loader);
  // }

  private async proccessDocuments(loader: PDFLoader | TextLoader | RecursiveUrlLoader | DirectoryLoader | YoutubeLoader | GithubRepoLoader | CSVLoader | DocxLoader | FigmaFileLoader) {
    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
    if(this.vectorStore) {
      await this.vectorStore.addDocuments(splittedDocs);
    } else {
      this.vectorStore = await MemoryVectorStore.fromDocuments(splittedDocs, this.embeddingModel)
    }
    if(!this.chain) {
      this.chain = RetrievalQAChain.fromLLM(
        this.model,
        this.vectorStore.asRetriever(),
        {
          prompt: this.promptTemplate,
        },
      );
    }
  }

  async askAssistant(prompt: string) {
    return await this.chain.call({
      query: prompt,
    });
  }
}
