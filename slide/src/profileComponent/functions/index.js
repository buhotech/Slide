import axios from '../../utlities/axios';

export const getUserProfileInfo = userId => {
  let api_url = `users/${userId}/user_info/`;
  return axios.get(api_url);
};
