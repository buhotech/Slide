import React, { Component } from 'react';

//create new user function
import { createNewUser } from '../functions/index';

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
  /*

        Add the new user to the lilchat users table as well 
    */
  handleRegisterRequest = e => {
    e.preventDefault();
    const { email, password, bio, username } = this.state;
    createNewUser(email, password);
    newUser(bio, username)
      .then(responce => {
        console.log(responce);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
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
