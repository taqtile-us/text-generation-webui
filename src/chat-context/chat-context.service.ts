import { Injectable } from '@nestjs/common';
import { PromptTemplate } from 'langchain/prompts';
import { Ollama } from 'langchain/llms/ollama';
import { ConversationalRetrievalQAChain, RetrievalQAChain } from 'langchain/chains';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OllamaEmbeddings } from 'langchain/embeddings/ollama';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url";
import { compile } from "html-to-text";
import { commonConfig, fiveSControlConfig } from 'uploads/projects/with-config/config';
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";

@Injectable()
export class ChatContextService {
  chain;
  vectorStore;
  promptTemplate = new PromptTemplate({
    template: `analize this information about this manufacturing solutions: {context}, and answer questions as if you are product owner: {question}`,
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
    await this.useConfigFile();
  }

  async useConfigFile() {
    for (const link in fiveSControlConfig.data.links) {
     await this.useHTMLPage(link)
    }
    for(const pdf in fiveSControlConfig.data.pdfPaths) {
      await this.usePdfDoc(fiveSControlConfig.data.pdfPaths[pdf])
    }
    for(const txt in fiveSControlConfig.data.txtPaths) {
      await this.useTXTfile(fiveSControlConfig.data.txtPaths[txt])
    }
  }

  async useCommonConfigFile(projectName: string) {
    const projectConfig = commonConfig.find((proj) => proj.projectName === projectName);
    await this.useMultiLoader(projectConfig.extraInfoForChatPath);
    for (const site in projectConfig.websitesLinks) {
      await this.useCustomHTMLPage(projectConfig.websitesLinks[site].link, projectConfig.websitesLinks[site].crawlDepth)
    }
    // for (const index in projectConfig.youtubeVideoLinks) {
    //   await this.useYoutubeVideo(projectConfig.youtubeVideoLinks[index])
    // }
    // for (const index in projectConfig.gitHubRepositories) {
    //   await this.useGitHubProject(projectConfig.gitHubRepositories[index].link, projectConfig.gitHubRepositories[index].branch)
    // }
  }

  private async useGitHubProject(projectUrl, branchName) {
    const loader = new GithubRepoLoader(
      projectUrl,
      {
        branch: branchName,
        recursive: false,
        unknown: "warn",
        maxConcurrency: 5, // Defaults to 2
      }
    );
    await this.proccessDocuments(loader);
  }

  private async useYoutubeVideo (url: string) {
    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });
   await this.proccessDocuments(loader);
  }

  private async useMultiLoader(folderPath: string) {
    const loader = new DirectoryLoader(
      folderPath,
      {
        ".pdf": (path) => new PDFLoader(path),
        ".txt": (path) => new TextLoader(path), 
      }
    );
   await this.proccessDocuments(loader);
  }

  private async useHTMLPage(link: string) {
    const compiledConvert = compile({ wordwrap: 130 })
    const loader = new RecursiveUrlLoader(link, {
      extractor: compiledConvert,
      maxDepth: 5,
    });
    this.proccessDocuments(loader);
  }

  private async useCustomHTMLPage(link: string, depth: number) {
    const compiledConvert = compile({ wordwrap: 130 })
    const loader = new RecursiveUrlLoader(link, {
      extractor: compiledConvert,
      maxDepth: depth,
    });
    await this.proccessDocuments(loader);
  }

  private async useTXTfile(filepath: string) {
    const loader = new TextLoader(filepath);
    await this.proccessDocuments(loader);
  }

  private async usePdfDoc(filepath: string) {
    const loader = new PDFLoader(filepath);
    await this.proccessDocuments(loader)
  }

  private async proccessDocuments(loader: PDFLoader | TextLoader | RecursiveUrlLoader | DirectoryLoader | YoutubeLoader | GithubRepoLoader) {
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
