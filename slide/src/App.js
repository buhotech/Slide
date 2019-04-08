import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileScene from './profileComponent/ProfileScene';
import Match from './components/Match';
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
          <Route exact path="/match" component={Match} />
        </Switch>
      </div>
    );
  }
}

export default App;
