import axios from "axios";

export const apiGetListOfContextFiles = () => {
   return axios.get(`http://localhost:5000/test/get-pdfs/list`)
        .then((res) => res.data)
       .catch(err => console.log(err));
}

export const apiChooseFileForContext = (fileNAme: string) => {
   return axios.get(`http://localhost:5000/test/create-chain/file${fileNAme}`)
       .then((res) => res.data)
       .catch(err => console.log(err));
}

export const apiAskAssistant = (prompt: string) => {
   return axios.get(`http://localhost:5000/test/ask${prompt}`)
       .then((res) => res.data)
       .catch(err => console.log(err));
}