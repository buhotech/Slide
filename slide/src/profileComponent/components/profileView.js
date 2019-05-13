import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { getCurrentChat } from '../functions/index';

//RENDER THE USER PROFILE
class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatIds: [],
      cbResponce: false
    };
  }

  startLobbySession = () => {
    this.props.history.push('/lobby');
  };

  viewChats = () => {
    this.props.history.push('/chats');
  };

  async componentDidMount() {
    try {
      let getChats = await getCurrentChat();
      if (getChats.status === 200) {
        let data = getChats.data;
        this.setState({
          chatIds: data,
          cbResponce: true
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const userInfo = this.props.userInfo;
    let { chatIds } = this.state;

    let gameBtn =
      chatIds.length === 0 ? (
        <div onClick={this.startLobbySession}>Join a lobby</div>
      ) : (
        <div onClick={this.viewChats}>View Chats</div>
      );

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
          <div className="buttons_grid">{gameBtn}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileView);
