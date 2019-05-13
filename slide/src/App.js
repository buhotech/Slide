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
  constructor() {
    super();
    this.state = {
      blur: false
    };
    this.onNavBarClick = this.onNavBarClick.bind(this);
  }
  onNavBarClick() {
    this.setState(prev => {
      return { blur: !prev.blur };
    });
  }
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Navbar blurbg={this.onNavBarClick} />
        <div id="app_wrap" className={this.state.blur ? 'blur_bg' : ''}>
          <Switch>
            {/* <Route exact path="/profile" component={ProfileScene} /> */}
            <PrivateRoute exact path="/" component={ProfileScene} />
            <PrivateRoute exact path="/match-test" component={Match} />
            <PrivateRoute exact path="/word-grid-test" component={Lobby} />
            <Route exact path="/login" component={LoginUserForm} />
            <Route exact path="/register" component={RegisterUserForm} />
            <PrivateRoute exact path="/chats" component={ChatScreenListScence} />
            <PrivateRoute exact path="/chats/:chat_id" component={ChatScreenScene} />
            <PrivateRoute exact path="/profile" component={ProfileScene} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
