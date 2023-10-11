import axios from "axios";
import * as Process from "process";

export const apiGetListOfContextFiles = () => {
   return axios.get(`${Process.env.API_BASE_URL}/get-pdfs/list`)
        .then((res) => res.data)
       .catch(err => console.log(err));
}

export const apiChooseFileForContext = (fileNAme: string) => {
   return axios.get(`${Process.env.API_BASE_URL}/create-chain/file${fileNAme}`)
       .then((res) => res.data)
       .catch(err => console.log(err));
}

export const apiAskAssistant = (prompt: string) => {
   return axios.get(`${Process.env.API_BASE_URL}/ask${prompt}`)
       .then((res) => res.data)
       .catch(err => console.log(err));
}