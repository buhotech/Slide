import React, { Component } from 'react';

//import functions
import { getUserProfileInfo } from './functions/index';

//components
import ProfileView from './components/profileView';
import ExclusiveProfileFriends from '../topFiveComponent/components/exclusiveProfileFriends';

class ProfileScene extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: {
        bio: '',
        profile_pic: '',
        username: ''
      },
      cbResponce: false,
      error: false,
      userId: '12345'
    };
  }

  componentDidMount() {
    getUserProfileInfo()
      .then(user => {
        console.log(user);
        const { bio, profile_pic, username } = user.data;
        const userInfo = { bio, profile_pic, username };
        this.setState({ userInfo, cbResponce: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  render() {
    const { userInfo, cbResponce, userId } = this.state;
    return (
      <div>
        <h1>Render User Profile</h1>
        <ProfileView userInfo={userInfo} cbResponce={cbResponce} />
        <ExclusiveProfileFriends userId={userId} />
      </div>
    );
  }
}

export default ProfileScene;
