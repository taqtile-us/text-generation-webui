import {UnstructuredDirectoryLoader} from "langchain/document_loaders/fs/unstructured";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import { HuggingFaceTransformersEmbeddings } from "langchain/embeddings/hf_transformers";
import { Chroma } from "langchain/vectorstores/chroma";
import { RetrievalQAChain } from "langchain/chains";

const docs = new UnstructuredDirectoryLoader('./documents', {});

const data = await docs.load();

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
});

const splitDocs = await textSplitter.splitDocuments(data);

const embeddingModel = new HuggingFaceTransformersEmbeddings({
    modelName: "Xenova/all-MiniLM-L6-v2",
});

const vectorStore = await Chroma.fromDocuments(splitDocs, embeddingModel, {
    collectionName: "a-test-collection",
    collectionMetadata: {
        "hnsw:space": "cosine",
    },
});

