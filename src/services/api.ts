import axios from 'axios';

const api = axios.create({
  baseURL: 'https://server-proffy-deploy.herokuapp.com/',
});

export default api;
