import axios from "axios";

export const apiInitConfigFile = async (project: string) => {
   try {
      const res = await axios.get(`http://192.168.0.111:3002/test/init-config-file${project}`);
      return res.data;
   } catch (err) {
      return console.log(err);
   }
}

export const apiAskAssistant = async (prompt: string, projectName: string) => {
   try {
      const res = await axios.get(`http://192.168.0.111:3002/test/ask?prompt=${prompt}&projectName=${projectName}`);
      return res.data;
   } catch (err) {
      return console.log(err);
   }
}

export const apiGetListOfProjects = async () => {
   try {
      const res = await axios.get(`http://192.168.0.111:3002/test/list-of-projects`);
      return res.data;
   } catch (err) {
      return console.log(err);
   }
}