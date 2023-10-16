import {action, makeAutoObservable, observable} from "mobx"
import {ChatMessage, DirectoryTree} from "../shared/types";
import autoBind from 'auto-bind'
import {apiAskAssistant, apiChooseFileForContext, apiGetListOfContextFiles} from "../api/chat-api";

class ChatStore {

    constructor() {
        makeAutoObservable(this)
        autoBind(this)
    }

    @observable messages: ChatMessage[] = [{
        id: 0,
        author: 'llama',
        message: 'Hi! My name is ChatGuru! I am your personal AI assistant! How can I help you?'
    }];
    @observable isRequestAble: boolean = true;
    @observable chatContextFileName: string = 'None';
    @observable projectsTree: DirectoryTree = {} as DirectoryTree;

    @action addMessage(message: ChatMessage) {
        this.messages = [...this.messages, message]
    }

    @action setIsRequestAble(value: boolean) {
        this.isRequestAble = value;
    }

    @action setChatContextFileName(value: string) {
        this.chatContextFileName = value;
        apiChooseFileForContext(value);
    }

    @action async askAssistant(prompt: string){
        const res = await apiAskAssistant(prompt);
        this.messages.push({
            id: Date.now() as number,
            author: 'llama',
            message: res.text
        })
    }

    @action async getListOfFiles() {
        apiGetListOfContextFiles()
            .then(res => this.projectsTree = res as DirectoryTree);
    }
}

export const chatStore = new ChatStore()
