import axios from '../../utilities/axios';

export const joinLobby = () => {
  let auth = localStorage.getItem(`idToken`);
  return axios.get(`/joinlobby`, { headers: { Authorization: `${auth}` } });
};

export const sendLikes = (selectedWords, lobbyId) => {
  let auth = localStorage.getItem(`idToken`);
  let url = `/${lobbyId}/sendmylikes`;
  let word = selectedWords.join(',');
  console.log(word);
  return axios.post(url, { words: word }, { headers: { Authorization: `${auth}` } });
};
