import * as firebase from 'firebase';

// const auth = firebase.auth()

export const loginUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const createNewUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
