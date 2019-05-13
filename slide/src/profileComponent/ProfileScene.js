import React, { Component } from 'react';

//import functions
import { getUserProfileInfo } from './functions/index';

//components
import ProfileView from './components/profileView';

import './styles/profile_scene.scss';

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
    // fetch("http://localhost:5000/lilchat/-Lej4IvzeB-O6YLyXGvK/sendmylikes",{
    //     method: "POST",
    //     mode:'cors',
    //      headers: {
    //       'Accept': 'application/json',
    //        'Content-Type': 'application/x-www-form-urlencoded',
    //       'Authorization':localStorage.getItem("idToken")
    //     },
    //     body: JSON.stringify({"words": "-Lej4IvzeB-O6YLyXGvL"})
    //   }).then(function(res){
    //     return res.json();
    //   }).then(function(res){
    //     //app.setState({"events":res});
    //     console.log(res);

    //   })

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
        <ProfileView userId={userId} userInfo={userInfo} cbResponce={cbResponce} />
      </div>
    );
  }
}

export default ProfileScene;
