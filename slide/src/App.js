import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import logo from './logo.svg';

// components
import ProfileScene from './profileComponent/ProfileScene';
import LoginUserForm from './userComponent/form/LoginUser';
import RegisterUserForm from './userComponent/form/RegisterUser';
import ChatScreenScene from './chatComponent/ChatScreenScene';
import Match from './components/match';
import Lobby from './lobby/Lobby';
import ChatScreenListScence from './currentChatsComponent/CurrentChatsListScene';
import Navbar from './navbarComponent/Navbar';

//privaterouter
import { PrivateRoute } from './utilities/PrivateRoute';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          {/* <Route exact path="/profile" component={ProfileScene} /> */}
          <Route exact path="/match-test" component={Match} />
          <Route exact path="/lobby" component={Lobby} />
          <Route exact path="/login" component={LoginUserForm} />
          <Route exact path="/register" component={RegisterUserForm} />
          <Route exact path="/chats" component={ChatScreenListScence} />
          <Route exact path="/chats/:chat_id" component={ChatScreenScene} />
          <PrivateRoute exact path="/profile" component={ProfileScene} />
        </Switch>
      </div>
    );
  }
}

export default App;
