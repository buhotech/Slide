import React, { Component } from 'react';
import './styles/message.css';

class Message extends Component {
  render() {
    return (
      <div
        className={
          (this.props.username === this.props.my_user ? 'my_message' : 'other_message') +
          '_class_align message_container'
        }
      >
        <div className="message_wrap">
          <p
            className="message_username"
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
              (this.props.username === this.props.my_user ? 'my_message' : 'teal other_message') +
              '_content message_container'
            }
            style={
              this.props.username === this.props.my_user
                ? { textAlign: 'right' }
                : { textAlign: 'left' }
            }
          >
            {this.props.content}
          </p>
        </div>
      </div>
    );
  }
}

export default Message;
