import axios from '../../utilities/axios';
// import axios from 'axios'

export const getUserProfileInfo = () => {
  let api_url = `/users/currentuser`;
  let idToken = localStorage.getItem('idToken');
  return axios.get(api_url, { headers: { Authorization: `${idToken}` } });
};
