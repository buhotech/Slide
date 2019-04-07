import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatScreenScene from './chatComponent/ChatScreenScene';

//react router
import {Route, Switch} from 'react-router-dom'
//components
import ProfileScene from './profileComponent/ProfileScene';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
            <Route exact path='/profile' component={ProfileScene} />
        </Switch>
      </div>

    );
  }
}

export default App;
