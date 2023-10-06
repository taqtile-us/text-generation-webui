import {PromptTemplate} from "langchain/prompts";
import {Ollama} from "langchain/llms/ollama";
import {RetrievalQAChain} from "langchain/chains";
import {PDFLoader} from 'langchain/document_loaders/fs/pdf';
import {RecursiveCharacterTextSplitter} from 'langchain/text_splitter';
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {HuggingFaceTransformersEmbeddings} from "langchain/embeddings/hf_transformers";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function uploadPDF(req: NextApiRequest, res: NextApiResponse<{data: any}>) {
 if(req.method === 'POST') {
    const {filepath} = await JSON.parse(req.body);
    const loader = new PDFLoader(filepath);
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0
})
const documents = await loader.load();
const splittedDocs = await textSplitter.splitDocuments(documents)
console.log(splittedDocs)
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
    query: 'what is this instruction about'
})
res.send({data: result})
res.status(200)
 }
}