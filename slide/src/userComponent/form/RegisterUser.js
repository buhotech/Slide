import React, { Component } from 'react';

//react router
import { Redirect } from 'react-router-dom';

//create new user function
import { createNewUser, newUser, storeUserInfo } from '../functions/index';

//handle the user profile pic
class RegisterUserForm extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      errorMessage: '',
      cbResponce: false,
      email: '',
      password: '',
      password2: '',
      username: '',
      bio: '',
      step: 0
    };
  }

  nextStp = () => {
    this.setState(prev => ({
      step: prev.step + 1
    }));
  };

  prevStp = () => {
    this.setState(prev => ({
      step: prev.step - 1
    }));
  };

  passwordMatch() {
    const { password, password2 } = this.state;
  }

  onChange = e => {
    e.preventDefault();
    const field = e.target.name;
    const val = e.target.value;
    this.setState({ [field]: val });
  };
  onUsernameChange = e => {
    const { username } = this.state;
    const val = e.target.value;
  };
  handleRegisterRequest = e => {
    e.preventDefault();
    const { email, password, password2 } = this.state;

    if (password === password2) {
      createNewUser(email, password)
        .then(user => {
          console.log(user);
          this.nextStp();
        })
        .catch(err => {
          this.setState({
            error: true,
            errorMessage: err.message
          });
        });
    } else {
      this.setState({
        passwordMatch: false,
        error: true,
        errorMessage: `Passwords do not match`
      });
    }
  };

  handleUserInfo = () => {
    const { username, bio } = this.state;
    newUser(bio, username)
      .then(user => {
        this.nextStp();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const {
      error,
      errorMessage,
      cbResponce,
      step,
      username,
      bio,
      email,
      password,
      password2
    } = this.state;

    let errorComponent = error ? <h3>{errorMessage}</h3> : <span />;
    if (cbResponce) return <Redirect to="/profile" />;

    switch (step) {
      case 0:
        return (
          <div className="register-container">
            {errorComponent}
            <h2>Enter Email and Password</h2>

            <div className="email-container">
              <input
                name="email"
                value={email}
                type="email"
                className=""
                placeholder="email"
                onChange={this.onChange}
              />
            </div>

            <div className="password-container">
              <input
                name="password"
                value={password}
                type="password"
                className=""
                placeholder="password"
                onChange={this.onChange}
              />
            </div>

            <div className="password-container">
              <input
                name="password2"
                value={password2}
                type="password"
                className=""
                placeholder="password"
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleRegisterRequest}>
              Next
            </button>
          </div>
        );
      case 1:
        return (
          <div className="container">
            <div className="username-container">
              <input
                name="username"
                value={username}
                type="text"
                className=""
                placeholder="username"
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.nextStp}>
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="bio-container">
              <input
                name="bio"
                value={bio}
                type="text"
                className=""
                placeholder="enter show bio"
                onChange={this.onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.prevStp}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" onClick={this.nextStp}>
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <div>
              <h2>{username}</h2>
              <p>{bio}</p>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.prevStp}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" onClick={this.handleUserInfo}>
              Done
            </button>
          </div>
        );
      case 4:
        return <Redirect to="/profile" />;
    }
  }
}

export default RegisterUserForm;
