import React, { Component } from 'react';
import './styles/message.scss';

class Message extends Component {
  render() {
    return (
      <div className="message_class">
        <div
          className={
            (this.props.username === this.props.my_user ? 'my_message' : 'other_message') +
            '_class_align message_container ' +
            (this.props.display_username && !this.props.first_m ? 'user_msg_seperator' : '')
          }
        >
          <div className="profile_pic" />

          <div className="message_wrap">
            <div className="plus_characters">
              <p>-{this.props.content.length}</p>
            </div>
            <p
              className={(this.props.display_username ? '' : 'hide_content') + ' message_username'}
              style={
                this.props.username === this.props.my_user
                  ? { textAlign: 'right' }
                  : { textAlign: 'left' }
              }
            >
              {this.props.username === this.props.my_user ? 'YOU' : this.props.username}
            </p>
            <p
              className={
                (this.props.username === this.props.my_user
                  ? 'my_message_content'
                  : 'other_message_content current_bg_color_' + this.props.color) +
                ' message_container '
              }
            >
              {this.props.content}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
