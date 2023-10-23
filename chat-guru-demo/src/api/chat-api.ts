import axios from "axios";

export const apiInitConfigFile = async () => {
   try {
      const res = await axios.get(`http://192.168.1.183:3002/test/init-config-file`);
      return res.data;
   } catch (err) {
      return console.log(err);
   }
}

export const apiAskAssistant = async (prompt: string) => {
   try {
      const res = await axios.get(`http://192.168.1.183:3002/test/ask${prompt}`);
      return res.data;
   } catch (err) {
      return console.log(err);
   }
}

export const apiGetListOfProjects = async () => {
   try {
      const res = await axios.get(`http://192.168.1.183:3002/test/list-of-projects`);
      return res.data;
   } catch (err) {
      return console.log(err);
   }
}