import React, { Component } from 'react';
import * as firebase from 'firebase';
import Message from './Message';
import './styles/chatscreen.css';

class ChatScreenScence extends Component {
  constructor() {
    super();
    this.state = {
      messages: {},
      members: {},
      characters_left_res: 0,
      characters_left: 0
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.getChatInfo = this.getChatInfo.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.characterDecreaseAnimation = this.characterDecreaseAnimation.bind(this);
  }

  sendMessage() {
    let content = document.getElementById('message_input').value;
    if (content.length < 1) return;
    if (content.trim() == '') return;
    if (content == null) return;
    let username = 'myguy';
    fetch(
      `https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/${
        this.props.match.params.chat_id
      }/messages/new`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'elpapi',
          content: content,
          idToken: localStorage.getItem('idToken')
        })
      }
    )
      .then(res => res.json())
      .then(res => console.log(res));
    document.getElementById('message_input').value = '';
  }

  getMembers() {
    let c_screen = this;
    fetch(
      `https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/${
        this.props.match.params.chat_id
      }/chat_info/members`
    )
      .then(res => res.json())
      .then(res => {
        for (let member in res) {
          fetch(
            'https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/users/' +
              res[member] +
              '/user_info',
            {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: localStorage.getItem('idToken')
              }
            }
          ).then(uinfo_res => {
            console.log(uinfo_res);
          }); /*
            .then(user_info => {
              c_screen.setState(prev => {
                prev['members'][user_info['username']] = user_info['profile_pic'];
                return { members: prev['members'] };
              });
            });*/
        }
      });
  }
  getChatInfo() {
    let c_screen = this;
    fetch(
      `https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/${
        this.props.match.params.chat_id
      }/chat_info/`
    )
      .then(res => res.json())
      .then(res => {
        c_screen.setState({ chat_info: res });
      });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidUpdate() {
    this.scrollToBottom();
    //this.characterDecreaseAnimation(this.state.characters_left_res, this.state.characters_left);
  }

  characterDecreaseAnimation(to, val) {
    if (val == 0) return;

    let speed = 50;

    to = parseInt(to);
    val = parseInt(val);
    let t = this;
    setTimeout(function() {
      //
      document.getElementById('characters_left').innerHTML = val;
      if (val > to) t.characterDecreaseAnimation(to, val - 1);
    }, speed);
  }

  componentDidMount() {
    //this.scrollToBottom();
    let c_screen = this;
    //console.log(firebase.database());
    firebase
      .database()
      .ref(`lilchat/chats/${this.props.match.params.chat_id}/messages/`)
      .on('value', function(snap) {
        c_screen.setState({ messages: snap.val() });
        if (c_screen.state.messages != snap.val()) c_screen.scrollToBottom();
      });
    firebase
      .database()
      .ref(`lilchat/chats/${this.props.match.params.chat_id}/chat_info/characters`)
      .on('value', function(snap) {
        c_screen.setState({ characters_left_res: snap.val() });
        if (c_screen.state.characters_left_res != c_screen.state.characters_left)
          c_screen.characterDecreaseAnimation(
            c_screen.state.characters_left_res,
            c_screen.state.characters_left
          );
      });

    firebase
      .database()
      .ref(`lilchat/chats/${this.props.match.params.chat_id}/chat_info/characters`)
      .once('value', function(snap) {
        c_screen.setState({ characters_left: snap.val() });
        console.log(c_screen.state.characters_left);
      });
    this.getMembers();
    //fetch("https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/21/messages/").then(function(res){return res.json()}).then(function(res){c_screen.setState({"messages":res})});
  }
  render() {
    let rendered_messages = [];
    let prev_name = '';
    let first_m = true;
    for (let message in this.state.messages) {
      //console.log(first_m, message);
      let temp = (
        <Message
          key={message}
          my_user="elpapi"
          display_username={this.state.messages[message].username === prev_name ? false : true}
          first_m={first_m}
          message_user_pic={this.state.members[this.state.messages[message].username]}
          username={this.state.messages[message].username}
          content={this.state.messages[message].content}
        />
      );
      //console.log(this.state.messages[message].username);
      prev_name = this.state.messages[message].username;
      first_m = false;

      rendered_messages.push(temp);
    }
    return (
      <div className="chat_wrap">
        <div className="navBar" />
        <div className="chatTopLabel">
          <div className="chatTopLabelText2wrap">
            <p className="chatTopLabelText2" id="characters_left">
              {this.state.characters_left}
            </p>
          </div>
          <div className="chatTopLabelInfoWrap">
            <div className="chatTopLabelParticipant profile_pic_in_chat" />
            <div className="chatTopLabelMeta">
              <p className="chatTopLabelText1">Sid🍪🍪</p>
              <p className="chatTopLabelText1tag">Cookies n' Chill</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '15px', paddingBottom: '55px', paddingTop: '90px' }}>
          {rendered_messages}
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            width: '100vw',
            backgroundColor: 'red',
            zIndex: '10'
          }}
        >
          <div className="ui fluid action input">
            <input id="message_input" type="text" placeholder="Enter message..." />
            <div onClick={this.sendMessage} className="ui send_b button">
              send
            </div>
          </div>
        </div>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

export default ChatScreenScence;
