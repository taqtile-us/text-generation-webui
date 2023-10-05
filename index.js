// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { HuggingFaceTransformersEmbeddings } from "langchain/embeddings/hf_transformers";
// import { Chroma } from "langchain/vectorstores/chroma";
import { PromptTemplate } from "langchain/prompts";
import { Ollama } from "langchain/llms/ollama";
import { LLMChain } from "langchain/chains";
// const docs = new PDFLoader('./documents/WMF1000manual.pdf');
// const data = await docs.load();
// const textSplitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 500,
//     chunkOverlap: 0,
// });
// const splitDocs = await textSplitter.splitDocuments(data);
// const embeddingModel = new HuggingFaceTransformersEmbeddings({
//     modelName: "Xenova/all-MiniLM-L6-v2",
// });
// const vectorStore = await Chroma.fromDocuments(splitDocs, embeddingModel, {
//     collectionName: "a-test-collection",
//     collectionMetadata: {
//         "hnsw:space": "cosine",
//     },
// });
const template = `use this peace of text: {context}, and answer this question: {question}`;
const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ['context', 'question']
});
const model = new Ollama({
    baseUrl: "http://localhost:11434",
    model: "llama2:13b",
});
const chain = new LLMChain({
    llm: model,
    prompt: promptTemplate
});
const result = await chain.call({
    context: `The hot water boiler and the steam boiler are equipped with
    three-level protection from overheating and bursting.
     The first level is the temperature sensor. It switches the
    heater on and off based on the water temperature.
     The second level is the safety thermostat. If the surface
    temperature of a hot water boiler / steam boilerexceeds
    155°C, the safety thermostat interrupts the heating cir-
    cuit.
     The third safety level is the safety valve. It releases the
    overpressure that is built up.`,
    question: 'what is the temperature of hot water'
});
console.log(result);
