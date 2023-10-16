import axios from "axios";

export const apiGetListOfContextFiles = () => {
   return axios.get(`${process.env.API_BASE_URL}/get-projects-tree`)
        .then((res) => res.data)
       .catch(err => console.log(err));
}

export const apiChooseFileForContext = (fileNAme: string) => {
   return axios.get(`${process.env.API_BASE_URL}/create-chain/file${fileNAme}`)
       .then((res) => res.data)
       .catch(err => console.log(err));
}

export const apiAskAssistant = (prompt: string) => {
   return axios.get(`${process.env.API_BASE_URL}/ask${prompt}`)
       .then((res) => res.data)
       .catch(err => console.log(err));
}