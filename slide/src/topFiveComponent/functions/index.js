import axios from '../../utlities/axios';

//implement the top five feature later
//calling top the friends
export const getUserFriends = userId => {
  let api_url = `users/${userId}/friends/`;
  return axios.get(api_url);
};
