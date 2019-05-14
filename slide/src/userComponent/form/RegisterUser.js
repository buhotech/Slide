import React, { Component } from 'react';

//styles
import '../styles/index.scss';

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
    this.setState(state => {
      if (state.username.length > 0 && state.bio.length === 0) {
        return { step: state.step + 1, currentFormDone: true, error: false, backStp: false };
      } else if (state.username.length > 0 && state.bio.length > 0) {
        return { step: state.step + 1, currentFormDone: true, error: false, backStp: false };
      } else {
        return { step: state.step + 1, currentFormDone: false, error: false, backStp: false };
      }
    });
  };

  prevStp = () => {
    this.setState(state => ({
      step: state.step - 1,
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
      password2.length != 0 &&
      password2.length >= password.length
    ) {
      this.setState({
        passwordMatch: false,
        error: true,
        errorMessage: `Passwords do not match`,
        currentFormDone: false
      });
    } else {
      this.setState({
        currentFormDone: false
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
      } else if (val.length === 0) {
        this.setState({
          currentFormDone: false
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  validateUserInfo = () => {
    const { username, bio } = this.state;
    if (username.length === 0) {
      this.setState({
        step: 1,
        error: true,
        currentFormDone: false,
        backStp: true,
        errorMessage: 'Enter username'
      });
    } else if (bio.length === 0) {
      this.setState({
        step: 2,
        error: true,
        backStp: true,
        currentFormDone: false,
        errorMessage: 'Enter bio'
      });
    } else {
      this.createUserAccount();
    }
  };

  createUserAccount = () => {
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
          backStp: true,
          errorMessage: err.message,
          password: '',
          password2: ''
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
      currentFormDone
    } = this.state;

    let nextBtn = currentFormDone ? (
      <button className="log_in_Btn next" onClick={this.nextStp}>
        Next
      </button>
    ) : (
      <span />
    );

    let showErrorStyle, errorComponent;
    if (error) {
      showErrorStyle = `input-box error-input`;
      errorComponent = <h4 className="error-message">{errorMessage}</h4>;
    } else {
      showErrorStyle = `input-box`;
      errorComponent = <span />;
    }

    if (cbResponce) return <Redirect to="/profile" />;

    switch (step) {
      case 0:
        return (
          <div className="register-container">
            <div className="headline">
              <h4>tintu</h4>
            </div>
            <div className="error-message-container">{errorComponent}</div>

            <div className="register-form-container">
              <div className="user-auth-form">
                <div className="email-input-container">
                  <input
                    name="email"
                    value={email}
                    type="email"
                    required
                    className={showErrorStyle}
                    placeholder="email"
                    onChange={this.onChangeUser}
                  />
                </div>

                <div className="password-input-container">
                  <input
                    name="password"
                    value={password}
                    type="password"
                    className={showErrorStyle}
                    placeholder="password"
                    onChange={this.onChangeUser}
                  />
                </div>

                <div className="password-input-container">
                  <input
                    name="password2"
                    value={password2}
                    type="password"
                    className={showErrorStyle}
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
            <div className="headline">
              <h4>tintu</h4>
            </div>
            <div className="error-message-container">{errorComponent}</div>

            <div className="username-form-container">
              <div className="username-input-container">
                <input
                  name="username"
                  required
                  value={username}
                  type="text"
                  className={showErrorStyle}
                  placeholder="username"
                  onChange={this.onUsernameChange}
                />
              </div>

              <div className="btn-section">
                <button type="submit" className="log_in_Btn" onClick={this.prevStp}>
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
            <div className="headline">
              <h4>tintu</h4>
            </div>

            <div className="error-message-container">{errorComponent}</div>

            <div className="bio-form-container">
              <div className="bio-input-container">
                <input
                  name="bio"
                  required
                  value={bio}
                  type="text"
                  className={showErrorStyle}
                  placeholder="something short about you"
                  onChange={this.onChange}
                />
              </div>

              <div className="btn-section">
                <button type="submit" className="log_in_Btn" onClick={this.prevStp}>
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
            <div className="headline">
              <h4>Confirm Info</h4>
            </div>
            <div className="error-message-container">{errorComponent}</div>

            <div className="submit-form-container">
              <div>
                <h2>{username}</h2>
                <h2>{email}</h2>
                <h2>{bio}</h2>
              </div>

              <div className="btn-section">
                <button type="submit" className="log_in_Btn" onClick={this.prevStp}>
                  Back
                </button>
                <button type="submit" className="log_in_Btn" onClick={this.validateUserInfo}>
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
