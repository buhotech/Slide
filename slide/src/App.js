import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileScene from './profileComponent/ProfileScene';
// import logo from "./logo.svg";
import './App.css';

class App extends Component {
  componentDidMount() {
    fetch('https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/21/messages/')
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/profile" component={ProfileScene} />
        </Switch>
      </div>
    );
  }
}

export default App;
