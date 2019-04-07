import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import logo from './logo.svg';

//components
import ProfileScene from './profileComponent/ProfileScene';
import LoginUserForm from './userComponent/form/LoginUser';
import RegisterUserForm from './userComponent/form/RegisterUser';
// import ChatScreenScene from './chatComponent/ChatScreenScene';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/profile" component={ProfileScene} />
          <Route exact path="/login" component={LoginUserForm} />
          <Route exact path="/register" component={RegisterUserForm} />
        </Switch>
      </div>
    );
  }
}

export default App;
