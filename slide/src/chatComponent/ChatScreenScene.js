import React, { Component } from 'react';
import * as firebase from 'firebase';
class ChatScreenScence extends Component {
  constructor() {
    super();
    this.state = {
      messages: {}
    };
    this.sendMessage = this.sendMessage.bind(this);
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
        body: JSON.stringify({ username: 'Bill', content: content })
      }
    )
      .then(res => res.json())
      .then(res => console.log(res));
  }

  componentDidMount() {
    let c_screen = this;
    firebase
      .database()
      .reference('lilchat/chats/21/messages/')
      .once('value', function(snap) {
        console.log(snap.val());
      });
    //fetch("https://us-central1-project-bc489.cloudfunctions.net/slide/lilchat/chats/21/messages/").then(function(res){return res.json()}).then(function(res){c_screen.setState({"messages":res})});
  }
  render() {
    let rendered_messages = [];
    for (let message in this.state.messages) {
      let temp = (
        <div>
          <p>{this.state.messages[message].username} :</p>
          <p>{this.state.messages[message].content}</p>
          <br />
        </div>
      );
      rendered_messages.push(temp);
    }
    return (
      <div>
        {rendered_messages}
        <input id="message_input" />
        <button onClick={this.sendMessage}>send</button>
      </div>
    );
  }
}

export default ChatScreenScence;
