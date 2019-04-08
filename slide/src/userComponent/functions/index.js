import * as firebase from 'firebase';

// const auth = firebase.auth()

export const loginUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const createNewUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password);
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
};

export const newUser = async (bio, username) => {
  try {
    let api_url = '/users/new';
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    return axios.post(api_url, { bio, username, idToken });
  } catch (err) {
    console.log(err);
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') == 'true' ? true : false;
};
