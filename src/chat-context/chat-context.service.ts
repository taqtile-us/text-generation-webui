import { Injectable } from '@nestjs/common';
import { PromptTemplate } from 'langchain/prompts';
import { Ollama } from 'langchain/llms/ollama';
import { ConversationalRetrievalQAChain, RetrievalQAChain } from 'langchain/chains';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Chroma } from 'langchain/vectorstores/chroma';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OllamaEmbeddings } from 'langchain/embeddings/ollama';
import * as dirTree from 'directory-tree';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url";
import { compile } from "html-to-text";
import { fiveSControlConfig } from 'uploads/projects/with-config/config';

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

  async useHTMLPage(link: string) {
    const compiledConvert = compile({ wordwrap: 130 })
    const loader = new RecursiveUrlLoader(link, {
      extractor: compiledConvert,
      maxDepth: 5,
    });
    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
    console.log(`vector store is already created: ${!!this.vectorStore}`);
    if(this.vectorStore) {
      console.log('adding docs to exiting vectorStore')
      await this.vectorStore.addDocuments(splittedDocs);
    } else {
      console.log('creating new vectorStore')
      this.vectorStore = await MemoryVectorStore.fromDocuments(splittedDocs, this.embeddingModel)
    }
    console.log(`chain is created${!!this.chain}`)
      this.chain = RetrievalQAChain.fromLLM(
        this.model,
        this.vectorStore.asRetriever(),
        {
          prompt: this.promptTemplate,
        },
      );
    console.log('successful crawling')
  }

  async useTXTfile(filepath: string) {
    const loader = new TextLoader(filepath);
    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
      await this.vectorStore.addDocuments(splittedDocs);
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

  async usePdfDoc(filepath: string) {
    const loader = new PDFLoader(filepath);
    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
      await this.vectorStore.addDocuments(splittedDocs);
    if(!this.chain) {
      this.chain = RetrievalQAChain.fromLLM(
        this.model,
        this.vectorStore.asRetriever(),
        {
          prompt: this.promptTemplate,
        },
      );
    }
    console.log('chain created');
  }

  async askAssistant(prompt: string) {
    return await this.chain.call({
      query: prompt,
    });
  }
}
