import {action, makeAutoObservable, observable} from "mobx"
import {ChatMessage, DirectoryTree} from "../shared/types";
import autoBind from 'auto-bind'
import {apiAskAssistant, apiInitConfigFile} from "../api/chat-api";

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

    @action addMessage(message: ChatMessage) {
        this.messages = [...this.messages, message]
    }

    @action async askAssistant(prompt: string){
       await apiAskAssistant(prompt).then((res) => {
            console.log(res)
            this.messages.push({
                id: Date.now() as number,
                author: 'llama',
                message: JSON.stringify(res.text)
            })
        });
    }

    @action async getListOfFiles() {
        apiInitConfigFile()
            .then(res => {});
    }
}

export const chatStore = new ChatStore()
