import axios from "axios";

export const apiInitConfigFile = () => {
   return axios.get(`http://localhost:3002/test/init-config-file`)
        .then((res) => res.data)
       .catch(err => console.log(err));
}

export const apiAskAssistant = (prompt: string) => {
   return axios.get(`http://localhost:3002/test/ask${prompt}`)
       .then((res) => res.data)
       .catch(err => console.log(err));
}