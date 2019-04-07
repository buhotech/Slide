import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileScene from './profileComponent/ProfileScene';
// import ChatScreenScene from './chatComponent/ChatScreenScene';
import './App.css';
// import logo from './logo.svg';

class App extends Component {
  componentDidMount() {}

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
