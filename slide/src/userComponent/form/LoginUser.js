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
      errorMessage: '',
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
        console.log(err);
        this.setState({
          cbResponce: false,
          error: true,
          errorMessage: err.message
        });
      });
  };

  render() {
    const { cbResponce, error, errorMessage } = this.state;
    if (cbResponce) return <Redirect to="/profile" />;

    let showErrorStyles, errorComponent;
    if (error) {
      showErrorStyles = `input-box error-input`;
      errorComponent = <h4 className="error-message">{errorMessage}</h4>;
    } else {
      showErrorStyles = `input-box`;
      errorComponent = <span />;
    }

    return (
      <div className="login-container">
        <div className="headline">
          <h4>Log In</h4>
        </div>
        <div className="error-message-container">{errorComponent}</div>

        <div className="email-form-container">
          <div className="email-input-container">
            <input
              name="email"
              type="email"
              className={showErrorStyles}
              placeholder="email"
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className="password-input-form">
          <input
            name="password"
            type="password"
            className={showErrorStyles}
            placeholder="password"
            onChange={this.onChange}
          />
        </div>

        <div className="btn-section">
          <button className="Btn" onClick={this.handleLoginRequest}>
            Log in
          </button>
        </div>

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
      </div>
    );
  }
}

export default LoginUserForm;
