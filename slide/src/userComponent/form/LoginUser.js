import React, { Component } from 'react';

//react router
import { Redirect, Link, withRouter } from 'react-router-dom';

//sign in function
import { loginUser, LogOutUser, currentUser } from '../functions/index';

//styles
import '../styles/index.scss';

class LoginUserForm extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      errorMessage: '',
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
        console.log(user);
        localStorage.setItem('uid', user.user.uid);
        localStorage.setItem('idToken', user.user.ra);
        localStorage.setItem('isAuthenticated', 'true');
        this.props.history.push('/profile');
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
    const { error, errorMessage } = this.state;

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

export default withRouter(LoginUserForm);
