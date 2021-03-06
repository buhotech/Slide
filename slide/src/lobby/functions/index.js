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

export const sendGuess = (selectedWords, chatId) => {
  let auth = localStorage.getItem(`idToken`);
  let url = `/chats/${chatId}/sendmyguess`;
  let word = selectedWords[0];
  console.log(word);
  let localStorageName = 'guessing-' + chatId;
  localStorage.setItem(localStorageName, false);
  return axios.post(url, { content: word }, { headers: { Authorization: `${auth}` } });
};
