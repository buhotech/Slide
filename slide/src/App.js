import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatScreenScene from './chatComponent/ChatScreenScene';

//react router
//components
import { Route, Switch } from 'react-router-dom';
import ProfileScene from './profileComponent/ProfileScene';
// import logo from "./logo.svg";
import './App.css';

class App extends Component {
  componentDidMount() {
    
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
