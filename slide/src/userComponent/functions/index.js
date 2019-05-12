import * as firebase from 'firebase';
import axios from '../../utilities/axios';
import { createCipher } from 'crypto';

// const auth = firebase.auth()

export const loginUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const createNewAuthUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const LogOutUser = () => {
  localStorage.clear();
  //clear cookie
  return firebase.auth().signOut();
};

// export const storeUserInfo = () => {
//   firebase
//     .auth()
//     .currentUser.getIdToken(true)
//     .then(idToken => {
//
//     })
//     .catch(err => {
//       localStorage.setItem('isAuthenticated', 'true');
//     });
// };

export const newUser = async (bio, username) => {
  try {
    let api_url = '/users/new';
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('isAuthenticated', 'true');
    return axios.post(api_url, { bio, username }, { headers: { Authorization: `${idToken}` } });
  } catch (err) {
    return err;
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') == 'true' ? true : false;
};

export const currentUser = () => {
  let user = firebase.auth().currentUser;
  return user;
};

export const isUsernameAvailable = async username => {
  try {
    let api_url = `/validusername/${username}`;
    let responce = await axios.get(api_url);
    let isAvailable = responce.data.usernameAvailable;
    return isAvailable;
  } catch (err) {
    console.log();
  }
};
