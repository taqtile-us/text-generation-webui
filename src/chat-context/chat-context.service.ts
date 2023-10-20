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

  async useConfigFile() {
    for (const link of fiveSControlConfig.infoForChatGuru.youTubeLinks) {
     await this.useYoutubeVideo(link)
    }
    for(const pdf of fiveSControlConfig.infoForChatGuru.pdfPaths) {
      await this.usePdfDoc(pdf)
    }
    for(const txt of fiveSControlConfig.infoForChatGuru.txtPaths) {
      await this.useTXTfile(txt)
    }
  }

  async useCommonConfigFile(projectName: string) {
    const projectConfig = commonConfig.find((proj) => proj.projectName === projectName);
    this.promptTemplate = new PromptTemplate({
      template: projectConfig.behaviourTemplate,
      inputVariables: ['context', 'question'],
    });
    await this.useMultiLoader(projectConfig.extraInfoForChatPath);
    for (const link of projectConfig.youtubeVideoLinks) {
      await this.useYoutubeVideo(link)
    }
    for (const index in projectConfig.gitHubRepositories) {
      await this.useGitHubProject(projectConfig.gitHubRepositories[index].link, projectConfig.gitHubRepositories[index].branch)
    }
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
    if(!folderPath) return
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
