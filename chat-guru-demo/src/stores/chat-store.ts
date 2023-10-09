import {action, makeAutoObservable, observable} from "mobx"
import {ChatMessage} from "../shared/types";
import autoBind from 'auto-bind'

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
    @observable chatContextType: 'pdf' | 'website' | 'video' = 'pdf';

    @action addMessage(message: ChatMessage) {
        this.messages = [...this.messages, message]
    }

    @action setIsRequestAble(value: boolean) {
        this.isRequestAble = value;
    }

    @action setChatContextType(value: 'pdf' | 'website' | 'video') {
        this.chatContextType = value;
    }

}

export const chatStore = new ChatStore()
