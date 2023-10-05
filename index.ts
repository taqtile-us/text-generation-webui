import {PromptTemplate} from "langchain/prompts";
import {Ollama} from "langchain/llms/ollama";
import {RetrievalQAChain} from "langchain/chains";
import {PDFLoader} from 'langchain/document_loaders/fs/pdf';
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter';
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {HuggingFaceTransformersEmbeddings} from "langchain/embeddings/hf_transformers";

const loader = new PDFLoader('./documents/WMF1000manual.pdf');
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0
})
const documents = await loader.load();
const splittedDocs = await textSplitter.splitDocuments(documents)
const embeddingModel = new HuggingFaceTransformersEmbeddings({
    modelName: 'Xenova/all-MiniLM-L6-V2'
});
const vectorStore = await MemoryVectorStore.fromDocuments(splittedDocs, embeddingModel)

const template = `use this peace of text: {context}, and answer this question: {question}`;

const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ['context', 'question']
})

const model = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama2:13b",
});

const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {prompt: promptTemplate});

const result = await chain.call({
    query: 'what model of coffee machine is this instruction made for?'
})

console.log(result)
