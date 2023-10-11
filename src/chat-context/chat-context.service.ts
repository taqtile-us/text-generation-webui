import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readdirSync } from 'fs';
import { PromptTemplate } from 'langchain/prompts';
import { Ollama } from 'langchain/llms/ollama';
import { RetrievalQAChain } from 'langchain/chains';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OllamaEmbeddings } from 'langchain/embeddings/ollama';

@Injectable()
export class ChatContextService {
  chain;

  getPdfsList() {
    const filesPath = join(__dirname, '../../src/uploads/pdfs');
    return readdirSync(filesPath);
  }

  async usePdfDoc(name: string) {
    const loader = new PDFLoader(`src/uploads/pdfs/${name}`);
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 0,
    });
    const documents = await loader.load();
    const splittedDocs = await textSplitter.splitDocuments(documents);
    const embeddingModel = new OllamaEmbeddings({
      baseUrl: 'http://localhost:11434',
      model: 'llama2:13b',
    });

    console.log(JSON.stringify(MemoryVectorStore));

    //VVV error here
    const vectorStore = await MemoryVectorStore.fromDocuments(
      splittedDocs,
      embeddingModel,
    );

    const template = `use this peace of text: {context}, and answer this question: {question}`;

    const promptTemplate = new PromptTemplate({
      template,
      inputVariables: ['context', 'question'],
    });

    const model = new Ollama({
      baseUrl: 'http://localhost:11434',
      model: 'llama2:13b',
    });

    this.chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
      prompt: promptTemplate,
    });
    console.log('chain created');
  }

  async askAssistant(prompt: string) {
    const result = await this.chain.call({
      query: prompt,
    });
    return result;
  }
}
