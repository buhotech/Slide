import React, { Component } from 'react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';

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

  routeChange = () => {
    this.props.history.push('/Register');
  };

  render() {
    const { cbResponce, error } = this.state;
    if (cbResponce) return <Redirect to="/profile" />;

    return (
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input icon="user" iconPosition="left" label="Username" placeholder="Username" />
              <Form.Input icon="lock" iconPosition="left" label="Password" type="password" />

              <Button content="Login" primary onClick={this.handleLoginRequest} />
            </Form>
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Button content="Sign up" icon="signup" size="big" onClick={this.routeChange} />
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    );
  }
}

export default LoginUserForm;
