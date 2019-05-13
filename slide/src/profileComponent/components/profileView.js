import React, { Component } from 'react';

//RENDER THE USER PROFILE
class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userInfo = this.props.userInfo;

    const userId = this.props.userId;
    return (
      <div className="profile_container">
        <div className="profile_info_wrap">
          <div className="img_container">
            <div
              className="profile_pic"
              style={{ backgroundImage: 'url(' + userInfo.profile_pic + ')' }}
            />
            <h2 className="username">{userInfo.username}</h2>
          </div>
          <div className="bio">
            <p className="bio_text">{userInfo.bio}</p>
            <div className="extra_info">
              <div>
                <p className="characters_used">64</p>
                <p className="characters_used_label">matches</p>
              </div>
              <div>
                <p className="characters_used">243</p>
                <p className="characters_used_label">characters used</p>
              </div>
              <div>
                <p className="characters_used">13</p>
                <p className="characters_used_label">wins</p>
              </div>
            </div>
          </div>
          <div className="buttons_grid">
            <div />
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
