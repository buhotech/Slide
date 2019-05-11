import React, { Component } from 'react';
import * as firebase from 'firebase';
import ChatListItem from './ChatListItem';
import './styles/ChatScreenListScence.scss';
import LoadingView from '../Loading/LoadingView';

import { Link } from 'react-router-dom';

class ChatScreenListScence extends Component {
  constructor() {
    super();
    this.state = {
      chats: [],
      loaded_chats: false
    };
    this.startChat = this.startChat.bind(this);
    this.getChatsList = this.getChatsList.bind(this);
  }

  componentDidMount() {
    this.getChatsList();
  }

  startChat(chat_id) {}

  getChatsList() {
    let a = this;
    let u_id = localStorage.getItem('uid');
    firebase
      .database()
      .ref(`lilchat/private_users/${u_id}/active_chats/`)
      .on('value', function(snap) {
        console.log(snap.val());
        a.setState({ chats: [] });
        let chat_list_obs = [];
        for (let chat_id in snap.val()) {
          //console.log(`https://cryptic-peak-18479.herokuapp.com/lilchat/chats/${snap.val()[chat_id]}/chat_info/`);
          fetch(
            `https://cryptic-peak-18479.herokuapp.com/lilchat/chats/${
              snap.val()[chat_id]
            }/chat_info/`
          )
            .then(res => {
              return res.json();
            })
            .then(res => {
              a.setState(prevState => {
                let obs = prevState.chats;
                res.chat_id = snap.val()[chat_id];
                obs.push(res);

                return { chats: obs, loaded_chats: true };
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });

    /*	firebase.database().ref("my_user/current_chats").on("value", function(snap){
			for(let chat_id in snap.val()){
				fetch("").then(res=>{res.json()}).then(res=>{}).catch(res=>{});
			}
		})*/
  }

  render() {
    let rendered_chat_list = [];
    let sorted_list = this.state.chats.sort(function(a, b) {
      return a.last_message_time < b.last_message_time;
    });
    let i = 0;

    for (let chat_list_ob in sorted_list) {
      //console.log(chat_list_ob);
      let info = {
        pathname: '/chats/' + this.state.chats[chat_list_ob].chat_id,
        state: { test: 'testb' }
      };

      let temp = (
        <div key={i}>
          <Link to={info}>
            <ChatListItem
              characters={this.state.chats[chat_list_ob].characters}
              color={this.state.chats[chat_list_ob].color}
              username={this.state.chats[chat_list_ob].username}
              profile_url={this.state.chats[chat_list_ob].profile_url}
              peek={this.state.chats[chat_list_ob].peek}
            />
          </Link>
        </div>
      );
      rendered_chat_list.push(temp);
      i++;
    }
    if (!this.state.loaded_chats) {
      return (
        <div>
          <LoadingView />
        </div>
      );
    } else {
      return <div className="chatScreenListScence">{rendered_chat_list}</div>;
    }
  }
}

export default ChatScreenListScence;
