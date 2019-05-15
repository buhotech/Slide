import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import { getCurrentChat } from '../functions/index';

//RENDER THE USER PROFILE
class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatIds: [],
      cbResponce: false,
      btnWaitingStatus: false,
      mode: 'join_lobby'
    };
  }

  startLobbySession = () => {
    this.props.history.push('/lobby');
  };

  viewChats = () => {
    this.props.history.push('/chats');
  };

  async componentDidMount() {
    let a = this;
    if (localStorage.getItem('lobbyID') != undefined) {
      firebase
        .database()
        .ref(`lilchat/private_users/${localStorage.getItem('uid')}/active_chats`)
        .on('value', function(snap_a) {
          let chats = 0;
          if (snap_a.val() != null) chats = snap_a.val().length;

          firebase
            .database()
            .ref(
              `lilchat/lobbies/${localStorage.getItem('lobbyID')}/users/${localStorage.getItem(
                'uid'
              )}/likes`
            )
            .on('value', function(snap) {
              console.log(snap.val());
              if (chats != 0) {
                a.setState({ mode: 'view_chats' });
              } else if (snap.val() == null) {
                a.setState({ mode: 'join_lobby' });
              } else {
                a.setState({ mode: 'waiting' });
              }
            });
        });
    }

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
    let { chatIds, btnWaitingStatus, mode } = this.state;

    let gameBtn;

    if (mode === 'waiting') {
      gameBtn = <div>Waiting for chat ...</div>;
    } else if (mode === 'join_lobby') {
      gameBtn = <div onClick={this.startLobbySession}>Join a lobby</div>;
    } else {
      gameBtn = <div onClick={this.viewChats}>View Chats</div>;
    }

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
                <p className="characters_used">{userInfo.matches}</p>
                <p className="characters_used_label">matches</p>
              </div>
              <div>
                <p className="characters_used">{userInfo.characters}</p>
                <p className="characters_used_label">characters used</p>
              </div>
              <div>
                <p className="characters_used">{userInfo.wins}</p>
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
