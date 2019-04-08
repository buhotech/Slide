import React, { Component } from 'react';

//react router
import { Redirect } from 'react-router-dom';

//create new user function
import { createNewUser, storeUserInfo, newUser } from '../functions/index';

//handle the user profile pic
class RegisterUserForm extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      cbResponce: false,
      email: '',
      password: '',
      username: '',
      bio: ''
    };
  }

  onChange = e => {
    e.preventDefault();
    const field = e.target.name;
    const val = e.target.value;
    this.setState({ [field]: val });
  };

  handleRegisterRequest = e => {
    e.preventDefault();
    const { email, password, bio, username } = this.state;

    createNewUser(email, password)
      .then(user => {
        storeUserInfo();
        newUser(bio, username).then(responce => {
          console.log(responce);
          this.setState({
            cbResponce: true
          });
        });
      })
      .catch(err => {
        this.setState({
          cbResponce: false,
          error: 'Error in Register Form/Request'
        });
        console.log(err);
      });
  };

  render() {
    const { error, cbResponce } = this.state;

    if (cbResponce) return <Redirect to="/profile" />;

    return (
      <div className="register-container">
        <form className="register-form">
          <h2>Register Page</h2>

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

          <div className="username-container">
            <input
              name="username"
              type="text"
              className=""
              placeholder="username"
              onChange={this.onChange}
            />
          </div>

          <div className="bio-container">
            <input
              name="bio"
              type="text"
              className=""
              placeholder="enter show bio"
              onChange={this.onChange}
            />
          </div>

          <p>
            <a href="/login">Have an account already?</a>
          </p>
          <button className="" onClick={this.handleRegisterRequest}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterUserForm;
