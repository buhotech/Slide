import React, { Component } from 'react';

//react router
import { Redirect } from 'react-router-dom';

//create new user function
import { createNewAuthUser, newUser, isUsernameAvailable } from '../functions/index';

//handle the user profile pic
class RegisterUserForm extends Component {
  constructor() {
    super();
    this.state = {
      backStp: false,
      passwordMatch: false,
      error: false,
      errorMessage: '',
      currentFormDone: false,
      email: '',
      password: '',
      password2: '',
      username: '',
      bio: '',
      step: 0
    };
  }

  nextStp = () => {
    this.setState(prev => {
      if (prev.backStp === true) {
        return {
          step: prev.step + 1,
          error: false,
          errorMessage: '',
          currentFormDone: true,
          showAnimation: false
        };
      } else {
        return {
          step: prev.step + 1,
          backStp: false,
          errorMessage: '',
          currentFormDone: false,
          showAnimation: false
        };
      }
    });
  };

  prevStp = () => {
    this.setState(prev => ({
      step: prev.step - 1,
      currentFormDone: true,
      backStp: true
    }));
  };

  onChange = e => {
    e.preventDefault();
    const field = e.target.name;
    const val = e.target.value;
    this.setState({ [field]: val, error: false, errorMessage: '' });
    this.validateForm(val);
  };

  onChangeUser = e => {
    e.preventDefault();
    let field = e.target.name;
    let val = e.target.value;
    this.setState({ [field]: val, error: false });
    this.passwordMatch(field, val);
  };

  onUsernameChange = async e => {
    e.preventDefault();
    const val = e.target.value;
    this.setState({ username: val, error: false, errorMessage: '' });
    this.validateUsername(val);
  };

  passwordMatch = (field, password2) => {
    let { password, email } = this.state;

    if (
      field === 'password2' &&
      password.length !== 0 &&
      email.length >= 2 &&
      password === password2 &&
      password.length === password2.length
    ) {
      this.setState({
        passwordMatch: true,
        error: false,
        currentFormDone: true
      });
    } else if (
      field === 'password2' &&
      password !== password2 &&
      password.length === password2.length
    ) {
      this.setState({
        passwordMatch: false,
        error: true,
        errorMessage: `Passwords do not match`,
        currentFormDone: false
      });
    } else {
      this.setState({
        error: false
        // currentFormDone: false
      });
    }
  };

  validateForm = val => {
    if (val.length === 0) {
      this.setState({
        currentFormDone: false
      });
    } else {
      this.setState({
        currentFormDone: true
      });
    }
  };

  validateUsername = async val => {
    try {
      if (val.length >= 4) {
        let isAvailable = await isUsernameAvailable(val);

        if (isAvailable) {
          this.setState({
            currentFormDone: true
          });
        } else if (val.length < 4) {
          this.setState({
            currentFormDone: false
          });
        } else {
          this.setState({
            error: true,
            currentFormDone: false,
            errorMessage: 'username is taken'
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleUserInfo = () => {
    const { username, bio, email, password } = this.state;

    createNewAuthUser(email, password)
      .then(newAuthUser => {
        newUser(bio, username)
          .then(user => {
            this.nextStp();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        this.setState({
          step: 0,
          currentFormDone: true,
          error: true,
          errorMessage: err.message
        });
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
      password2,
      currentFormDone,
      showAnimation
    } = this.state;

    let nextBtn = currentFormDone ? (
      <button type="submit" className="btn btn-primary" onClick={this.nextStp}>
        Next
      </button>
    ) : (
      <span />
    );

    let errorComponent = error ? <h3>{errorMessage}</h3> : <span />;

    if (cbResponce) return <Redirect to="/profile" />;
    switch (step) {
      case 0:
        return (
          <div className="register-container">
            <div className="register-form-container">
              <div className="error-message">{errorComponent}</div>
              <h4>Enter Email and Password</h4>

              <div className="user-auth-form">
                <div className="email-input-container">
                  <input
                    name="email"
                    value={email}
                    type="email"
                    required
                    className="input-box"
                    placeholder="email"
                    onChange={this.onChangeUser}
                  />
                </div>

                <div className="password-input-container">
                  <input
                    name="password"
                    value={password}
                    type="password"
                    className="input-box"
                    placeholder="password"
                    onChange={this.onChangeUser}
                  />
                </div>

                <div className="password-input-container">
                  <input
                    name="password2"
                    value={password2}
                    type="password"
                    className="input-box"
                    placeholder="password"
                    onChange={this.onChangeUser}
                  />
                </div>

                {nextBtn}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="username-container">
            <div className="username-form-container">
              <div className="error-message">{errorComponent}</div>

              <div className="username-input-container">
                <input
                  name="username"
                  required
                  value={username}
                  type="text"
                  className="input-box"
                  placeholder="username"
                  onChange={this.onUsernameChange}
                />
              </div>

              <div className="btn-section">
                <button type="submit" className="btn btn-primary" onClick={this.prevStp}>
                  Back
                </button>
                {nextBtn}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bio-container">
            <div className="bio-form-container">
              <div className="error-message">{errorComponent}</div>

              <div className="bio-input-container">
                <input
                  name="bio"
                  required
                  value={bio}
                  type="text"
                  className="input-box"
                  placeholder="enter show bio"
                  onChange={this.onChange}
                />
              </div>

              <div className="btn-section">
                <button type="submit" className="btn btn-primary" onClick={this.prevStp}>
                  Back
                </button>
                {nextBtn}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="submit-container">
            <div className="submit-form-container">
              <div className="error-message">{errorComponent}</div>

              <div>
                <h2>{username}</h2>
                <h2>{email}</h2>
                <h2>{bio}</h2>
              </div>

              <div className="btn-section">
                <button type="submit" className="btn btn-primary" onClick={this.prevStp}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary" onClick={this.handleUserInfo}>
                  Done
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return <Redirect to="/profile" />;
      default:
        return <Redirect to="/login" />;
    }
  }
}

export default RegisterUserForm;
