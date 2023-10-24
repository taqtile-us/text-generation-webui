import {action, makeAutoObservable, observable} from "mobx"
import {ChatMessage} from "../shared/types";
import autoBind from 'auto-bind'
import {apiAskAssistant, apiGetListOfProjects, apiInitConfigFile} from "../api/chat-api";

class ChatStore {

    constructor() {
        makeAutoObservable(this)
        autoBind(this)
    }

    @observable isLoading: boolean = false;
    @observable messages: ChatMessage[] = [{
        id: 0,
        author: 'llama',
        message: 'Hi! My name is ChatGuru! I am your personal AI assistant! How can I help you?'
    }];
    @observable listOfProjects: string[] = ['sadasdsa', 'sdasdsad', 'asdasdasdasd'];
    @observable selectedProject: string = '';

    @action getListOfProjects() {
        this.isLoading = true
        apiGetListOfProjects()
            .then(res => {
                this.listOfProjects = res;
                this.selectedProject = res[0];
            })
            .finally(() => this.isLoading = false);
    }

    @action setSelectedProject(value: string) {
        this.selectedProject = value;
    }

    @action addMessage(message: ChatMessage) {
        this.messages = [...this.messages, message]
    }

    @action
    async askAssistant(prompt: string) {
        this.isLoading = true
        await apiAskAssistant(prompt, this.selectedProject)
            .then((res) => {
                console.log(res)
                this.messages.push({
                    id: Date.now() as number,
                    author: 'llama',
                    message: JSON.stringify(res.text)
                })
            })
            .finally(() => this.isLoading = false);
    }

    @action
    async initConfigFile() {
        this.isLoading = true
        apiInitConfigFile(this.selectedProject)
            .then(res => {
            })
            .finally(() => this.isLoading = false)
    }
}

export const chatStore = new ChatStore()
