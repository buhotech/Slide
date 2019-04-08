import React, { Component } from 'react';

//react router
import { Redirect } from 'react-router-dom';

//sign in function
import { loginUser, storeUserInfo, LogOutUser } from '../functions/index';

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

          <p>
            <a href="/register">Create a new account</a>
          </p>
          <button className="" onClick={this.handleLoginRequest}>
            Log in
          </button>
          <br />
          <br />
          <button className="" onClick={this.logOut}>
            Log Out
          </button>
        </form>
      </div>
    );
  }
}

export default LoginUserForm;
