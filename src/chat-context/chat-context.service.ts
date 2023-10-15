import { Injectable } from '@nestjs/common';
import { PromptTemplate } from 'langchain/prompts';
import { Ollama } from 'langchain/llms/ollama';
import { RetrievalQAChain } from 'langchain/chains';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Chroma } from 'langchain/vectorstores/chroma';
import { OllamaEmbeddings } from 'langchain/embeddings/ollama';
import * as dirTree from 'directory-tree';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveUrlLoader } from 'langchain/document_loaders/web/recursive_url';

@Injectable()
export class ChatContextService {
  chain;
  promptTemplate = new PromptTemplate({
    template: `answer the question: {question}. Base your answer on this data: {context}`,
    inputVariables: ['context', 'question'],
  });
  textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  model = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'llama2:7b',
  });
  embeddingModel = new OllamaEmbeddings({
    baseUrl: 'http://localhost:11434',
    model: 'llama2:7b',
  });

  vectorStore = new Chroma(this.embeddingModel, {
    collectionName: 'test',
  });

  getPdfsList() {
    // const filesPath = join(__dirname, '../../src/uploads');
    // return readdirSync(filesPath);
    const tree = dirTree('./src/uploads/projects');
    console.log(tree);
    return tree;
  }

  async useHTMLPage(link: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const compile = require('html-to-text');

    const compiledConvert = compile({ wordwrap: 130 }); // returns (text: string) => string;

    const loader = new RecursiveUrlLoader(link, {
      extractor: compiledConvert,
      maxDepth: 5,
    });

    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
    await this.vectorStore.addDocuments(splittedDocs);
    this.chain = RetrievalQAChain.fromLLM(
      this.model,
      this.vectorStore.asRetriever(),
      {
        prompt: this.promptTemplate,
      },
    );
  }

  async useTXTfile(filename: string) {
    const loader = new TextLoader(`src/uploads/projects/${filename}`);
    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
    await this.vectorStore.addDocuments(splittedDocs);
    this.chain = RetrievalQAChain.fromLLM(
      this.model,
      this.vectorStore.asRetriever(),
      {
        prompt: this.promptTemplate,
      },
    );
  }

  async usePdfDoc(name: string) {
    const loader = new PDFLoader(`src/uploads/projects/${name}`);

    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
    await this.vectorStore.addDocuments(splittedDocs);

    this.chain = RetrievalQAChain.fromLLM(
      this.model,
      this.vectorStore.asRetriever(),
      {
        prompt: this.promptTemplate,
      },
    );
    console.log('chain created');
  }

  async askAssistant(prompt: string) {
    return await this.chain.call({
      query: prompt,
    });
  }
}
