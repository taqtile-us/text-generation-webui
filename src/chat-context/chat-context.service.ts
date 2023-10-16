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

@Injectable()
export class ChatContextService {
  chain;
  vectorStore;
  promptTemplate = new PromptTemplate({
    template: `Always remember this info: {context}, when you answer the question: {question}`,
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

  async getPdfsList() {
    const tree = dirTree('./src/uploads/projects');
    console.log(tree);
    return tree;
  }

  async useHTMLPage(link: string) {
    const compiledConvert = compile({ wordwrap: 130 })
    const loader = new RecursiveUrlLoader(link, {
      extractor: compiledConvert,
      maxDepth: 5,
    });
    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
    console.log(JSON.stringify(splittedDocs));
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
      console.log(JSON.stringify(this.chain))
    console.log('successful crawling')
  }

  async useTXTfile() {
    const loader = new TextLoader(`src/uploads/projects/one.txt`);
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

  async usePdfDoc() {
    const loader = new PDFLoader(`src/uploads/projects/WMF1000manual.pdf`);
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
    console.log(this.vectorStore.memoryVectors)
    return await this.chain.call({
      query: prompt,
    });
  }
}
