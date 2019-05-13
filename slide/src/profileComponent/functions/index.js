import axios from '../../utilities/axios';
let idToken = localStorage.getItem('idToken');

export const getUserProfileInfo = () => {
  let api_url = `/users/currentuser`;
  return axios.get(api_url, { headers: { Authorization: `${idToken}` } });
};

export const getCurrentChat = () => {
  return axios.get('/getcurrentchats', { headers: { Authorization: `${idToken}` } });
};
