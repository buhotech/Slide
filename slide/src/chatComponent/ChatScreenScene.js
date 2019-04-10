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
      characters_left: 1500
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.getChatInfo = this.getChatInfo.bind(this);
    this.getMembers = this.getMembers.bind(this);
  }

  sendMessage() {
    let content = document.getElementById('message_input').value;
    let username = 'myguy';
    fetch(
      'https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/21/messages/new',
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
      'https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/21/chat_info/members'
    )
      .then(res => res.json())
      .then(res => {
        for (let member in res) {
          //console.log({res[member]});
          fetch(
            'https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/users/' +
              res[member] +
              '/user_info'
          )
            .then(uinfo_res => {
              return uinfo_res.json();
            })
            .then(user_info => {
              c_screen.setState(prev => {
                prev['members'][user_info['username']] = user_info['profile_pic'];
                return { members: prev['members'] };
              });
            });
        }
      });
  }
  getChatInfo() {
    let c_screen = this;
    fetch('https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/21/chat_info/')
      .then(res => res.json())
      .then(res => {
        c_screen.setState({ chat_info: res });
      });
  }

  componentDidMount() {
    let c_screen = this;
    //console.log(firebase.database());
    firebase
      .database()
      .ref('lilchat/chats/21/messages/')
      .on('value', function(snap) {
        c_screen.setState({ messages: snap.val() });
      });
    firebase
      .database()
      .ref('lilchat/chats/21/chat_info/characters')
      .on('value', function(snap) {
        c_screen.setState({ characters_left: snap.val() });
      });
    this.getMembers();
    //fetch("https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/21/messages/").then(function(res){return res.json()}).then(function(res){c_screen.setState({"messages":res})});
  }
  render() {
    let rendered_messages = [];
    for (let message in this.state.messages) {
      let temp = (
        <Message
          my_user="elpapi"
          message_user_pic={this.state.members[this.state.messages[message].username]}
          username={this.state.messages[message].username}
          content={this.state.messages[message].content}
        />
      );
      rendered_messages.push(temp);
    }
    return (
      <div>
        <div className="chatTopLabel">
          <div className="chatTopLabelParticipant" />
          <p className="chatTopLabelText1">Devon</p>
          <p className="chatTopLabelText2">{this.state.characters_left}</p>
        </div>

        <div style={{ padding: '15px', paddingBottom: '35px', paddingTop: '145px' }}>
          {rendered_messages}
        </div>
        <div style={{ position: 'fixed', bottom: '0', width: '100vw', backgroundColor: 'red' }}>
          <div className="ui fluid action input">
            <input id="message_input" type="text" placeholder="Enter message..." />
            <div onClick={this.sendMessage} className="ui button">
              send
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatScreenScence;
