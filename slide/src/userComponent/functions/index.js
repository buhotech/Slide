import * as firebase from 'firebase';
import axios from '../../utilities/axios';

// const auth = firebase.auth()

export const loginUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const createNewUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const LogOutUser = () => {
  localStorage.clear();
  //clear cookie
  return firebase.auth().signOut();
};

export const storeUserInfo = () => {
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(idToken => {
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('isAuthenticated', 'true');
    })
    .catch(err => {
      localStorage.setItem('isAuthenticated', 'true');
    });
  //call userInfo
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') == 'true' ? true : false;
};

export const newUser = () => {
  // let api_url = `users/${userId}/user_info/`;
  // return axios.post(api_url, )
};
