import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount(){
    fetch("https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/21/messages/").then(function(res){return res.json()}).then(function(res){console.log(res)});
  }
  render() {
    return (
      <div className="App">
       
      </div>
    );
  }
}

export default App;
