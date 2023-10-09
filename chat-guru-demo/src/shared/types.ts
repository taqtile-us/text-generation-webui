export type ChatMessage = {
    id: number;
    author: 'user' | 'llama';
    message: string;
}