import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const config = {
  apiKey: 'AIzaSyBqqqMDs221ywv0UZ8nHXWIe8WPViTfBzU',
  authDomain: 'project-bc489.firebaseapp.com',
  databaseURL: 'https://project-bc489.firebaseio.com',
  projectId: 'project-bc489',
  storageBucket: 'project-bc489.appspot.com',
  messagingSenderId: '376964361270'
};
firebase.initializeApp(config);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
