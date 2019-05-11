import axios from 'axios';

const URL = 'https://cryptic-peak-18479.herokuapp.com/lilchat/';
export default axios.create({
  baseURL: URL,
  withCredentials: true
});
