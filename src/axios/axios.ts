import axios from "axios";
const instance = axios.create({
  baseURL: 'https://hireserver.labonnz.club',
});

export default instance;