import {action, makeAutoObservable, observable} from "mobx"
import {ChatMessage} from "../shared/types";
import autoBind from 'auto-bind'
import {apiChooseFileForContext, apiGetListOfContextFiles} from "../api/chat-api";

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
    @observable listOfFiles: string[];

    @action addMessage(message: ChatMessage) {
        this.messages = [...this.messages, message]
    }

    @action setIsRequestAble(value: boolean) {
        this.isRequestAble = value;
    }

    @action setChatContextType(value: string) {
        this.chatContextFileName = value;
        apiChooseFileForContext(value);
    }

    @action async getListOfFiles() {
        apiGetListOfContextFiles()
            .then(res => this.listOfFiles = res as string[]);
    }
}

export const chatStore = new ChatStore()
