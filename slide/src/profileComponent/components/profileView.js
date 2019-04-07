import React, { Component } from 'react';

//RENDER THE USER PROFILE
class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userInfo = this.props.userInfo;
    return (
      <div>
        <div className="img-container">
          <img height="300" width="300" src={userInfo.profile_pic} />
        </div>
        <div className="bio-container">
          <h2>{userInfo.username}</h2>
          <h3>{userInfo.bio}</h3>
        </div>
      </div>
    );
  }
}

export default ProfileView;
