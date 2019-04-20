import React, { Component } from 'react';

//react router
import { Redirect, Link } from 'react-router-dom';

//sign in function
import { loginUser, storeUserInfo, LogOutUser, currentUser } from '../functions/index';

//styles
import '../styles/index.scss';

class LoginUserForm extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      cbResponce: false,
      email: '',
      password: ''
    };
  }
  getCurrentUser = e => {
    e.preventDefault();
    console.log(currentUser());
  };
  logOut = e => {
    e.preventDefault();
    LogOutUser();
    console.log('log out user');
  };

  onChange = e => {
    e.preventDefault();
    const field = e.target.name;
    const val = e.target.value;
    this.setState({ [field]: val });
  };

  handleLoginRequest = e => {
    e.preventDefault();
    const { email, password } = this.state;

    loginUser(email, password)
      .then(user => {
        this.setState({
          cbResponce: true
        });
        storeUserInfo();
      })
      .catch(err => {
        this.setState({
          cbResponce: false,
          error: 'Error in Login Form'
        });
        console.log(err);
      });
  };

  render() {
    const { cbResponce, error } = this.state;
    if (cbResponce) return <Redirect to="/profile" />;

    return (
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form">
            <h2>Login Page</h2>

            <div className="email-container">
              <input
                name="email"
                type="email"
                className=""
                placeholder="email"
                onChange={this.onChange}
              />
            </div>

            <div className="password-container">
              <input
                name="password"
                type="password"
                className=""
                placeholder="password"
                onChange={this.onChange}
              />
            </div>

            <Link to="/register" className="">
              Create a new account
            </Link>
            <button className="ui basic button primary login-btn" onClick={this.handleLoginRequest}>
              Log in
            </button>
            <div className="Debug">
              <h3>Debug</h3>
              <button className="ui basic button btn" onClick={this.logOut}>
                Log Out
              </button>
              <br />
              <button className="ui basic button btn" onClick={this.getCurrentUser}>
                get current User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginUserForm;
