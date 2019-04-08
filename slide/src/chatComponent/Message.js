import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div
        className={
          (this.props.username === this.props.my_user ? 'my_message' : 'other_message') + '_class'
        }
      >
        <p
          style={
            this.props.username === this.props.my_user
              ? { textAlign: 'right' }
              : { textAlign: 'left' }
          }
        >
          {this.props.username === this.props.my_user ? 'YOU' : this.props.username}
        </p>
        <p
          style={
            this.props.username === this.props.my_user
              ? { textAlign: 'right' }
              : { textAlign: 'left' }
          }
        >
          {this.props.content}
        </p>
      </div>
    );
  }
}

export default Message;
