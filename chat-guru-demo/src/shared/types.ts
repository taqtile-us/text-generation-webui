export type ChatMessage = {
    id: number;
    author: 'user' | 'llama';
    message: string;
}

export type DirectoryTree = {
    path: string;
    name: string;
    size: number;
    type: "directory" | "file";
    children?: DirectoryTree[];
    extension?: string;
    isSymbolicLink?: boolean;
}