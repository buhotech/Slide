import axios from '../../utilities/axios';

let auth = localStorage.getItem(`idToken`);

export const joinLobby = () => {
  return axios.get(`/joinlobby`, { headers: { Authorization: `${auth}` } });
};

export const sendLikes = (selectedWords, lobbyId) => {
  let url = `/${lobbyId}/sendmylikes`;
  let word = selectedWords.join(',');
  console.log(word);
  return axios.post(url, { words: word }, { headers: { Authorization: `${auth}` } });
};
