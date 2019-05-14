import axios from 'axios';

const URL = 'https://cryptic-peak-18479.herokuapp.com/lilchat/';
//let URL = `http://localhost:5000/lilchat/`;
export default axios.create({
  baseURL: URL,
  withCredentials: true
});
