import { Injectable } from '@nestjs/common';
import { PromptTemplate } from 'langchain/prompts';
import { Ollama } from 'langchain/llms/ollama';
import { RetrievalQAChain } from 'langchain/chains';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OllamaEmbeddings } from 'langchain/embeddings/ollama';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import * as dirTree from 'directory-tree';

@Injectable()
export class ChatContextService {
  chain;
  template = `answer the question: {question}. Base your answer on this data: {context}`;
  textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  model = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'llama2:13b',
  });
  embeddingModel = new OllamaEmbeddings({
    baseUrl: 'http://localhost:11434',
    model: 'llama2:13b',
  });
  vectorStore = MemoryVectorStore.fromDocuments(null, this.embeddingModel);

  getPdfsList() {
    // const filesPath = join(__dirname, '../../src/uploads');
    // return readdirSync(filesPath);
    const tree = dirTree('./src/uploads/projects');
    console.log(tree);
    return tree;
  }

  async useHTMLPage(link: string) {
    const loader = new CheerioWebBaseLoader(link);
    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);
    await (await this.vectorStore).addDocuments(splittedDocs);
    const template = this.template;

    const promptTemplate = new PromptTemplate({
      template,
      inputVariables: ['context', 'question'],
    });
    this.chain = RetrievalQAChain.fromLLM(
      this.model,
      (await this.vectorStore).asRetriever(),
      {
        prompt: promptTemplate,
      },
    );
  }

  async usePdfDoc(name: string) {
    const loader = new PDFLoader(`src/uploads/pdfs/${name}`);

    const documents = await loader.load();
    const splittedDocs = await this.textSplitter.splitDocuments(documents);

    await (await this.vectorStore).addDocuments(splittedDocs);

    const template = this.template;

    const promptTemplate = new PromptTemplate({
      template,
      inputVariables: ['context', 'question'],
    });

    this.chain = RetrievalQAChain.fromLLM(
      this.model,
      (await this.vectorStore).asRetriever(),
      {
        prompt: promptTemplate,
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
