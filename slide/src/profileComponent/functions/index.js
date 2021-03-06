import axios from '../../utilities/axios';

export const getUserProfileInfo = () => {
  let api_url = `/users/currentuser`;
  let idToken = localStorage.getItem('idToken');
  return axios.get(api_url, { headers: { Authorization: `${idToken}` } });
};

export const getCurrentChat = () => {
  let idToken = localStorage.getItem('idToken');
  return axios.get('/getcurrentchats', { headers: { Authorization: `${idToken}` } });
};
