// import {PDFLoader} from "langchain/document_loaders/fs/pdf";
// import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
// import {HuggingFaceTransformersEmbeddings} from "langchain/embeddings/hf_transformers";
// import {Chroma} from "langchain/vectorstores/chroma";
// import {PromptTemplate} from "langchain/prompts";
import {Ollama} from "langchain/llms/ollama";
// import {RetrievalQAChain} from "langchain/chains";
// import {getEmbeddingContextSize} from "langchain/dist/base_language/count_tokens";

// const docs = new PDFLoader('./documents/WMF1000manual.pdf');

// const data = await docs.load();
//
// const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 0,
// });
//
// const splitDocs = await textSplitter.splitDocuments(data);
//
// const embeddingModel = new HuggingFaceTransformersEmbeddings({
//     modelName: "Xenova/all-MiniLM-L6-v2",
// });
//
// const vectorStore = await Chroma.fromDocuments(splitDocs, embeddingModel, {
//     collectionName: "a-test-collection",
//     collectionMetadata: {
//         "hnsw:space": "cosine",
//     },
// });
//
// const template = `Use the following pieces of context to answer the question at the end.
// If you don't know the answer, just say that you don't know, don't try to make up an answer.
// Use three sentences maximum and keep the answer as concise as possible.
// Always say "thanks for asking!" at the end of the answer.
// {context}
// Question: {question}
// Helpful Answer:`;

const model = new Ollama({
    baseUrl: "http://192.168.1.183:11435",
    model: "llama2:13b",
});

// const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
//     prompt: PromptTemplate.fromTemplate(template),
// });
//
// const result = await chain.call({query: 'what is the water tank capacity of this coffee machine?'})

const answer = await model.call('what is the capital of new zeeland')

console.log(answer)
