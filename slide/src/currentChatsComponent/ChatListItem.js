import React, { Component } from 'react';
import * as firebase from 'firebase';
import './styles/ChatListItem.scss';

class ChatListItem extends Component {
  render() {
    return (
      <div className="chatListItem">
        <div className={'current_bg_color_' + this.props.color + ' wrap'}>
          <div className="chat_list_profile_pic" />
          <div className="info_wrap">
            <p className="username">{this.props.username}</p>
            <p className="peek">{this.props.peek}</p>
          </div>
          <p className="characters_left">{this.props.characters}</p>
        </div>
      </div>
    );
  }
}

export default ChatListItem;
