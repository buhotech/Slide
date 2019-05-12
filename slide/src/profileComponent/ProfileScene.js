import React, { Component } from 'react';

//import functions
import { getUserProfileInfo } from './functions/index';

//components
import ProfileView from './components/profileView';
import JoinLobbyQueue from '../lobby/JoinLobbyButton';
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

  async componentDidMount() {
    try {
      let userInfoRes = await getUserProfileInfo();
      console.log(userInfoRes);
      if (userInfoRes.status === 200) {
        const { bio, profile_pic, username } = userInfoRes.data;
        const userInfo = { bio, profile_pic, username };
        localStorage.setItem('username', username);
        this.setState({ userInfo, cbResponce: true });
      }
    } catch (err) {
      this.setState({
        error: true,
        cbResponce: false
      });
    }
  }

  render() {
    const { userInfo, cbResponce, userId } = this.state;
    return (
      <div>
        <h1 className="ui header" style={{ paddingTop: '30px' }}>
          tintu logo
        </h1>
        <ProfileView userInfo={userInfo} cbResponce={cbResponce} />
        <JoinLobbyQueue userInfo={userInfo} />
        <ExclusiveProfileFriends userId={userId} />
      </div>
    );
  }
}

export default ProfileScene;
