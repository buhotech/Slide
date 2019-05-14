import React, { Component } from 'react';

//getUserFriends function
import { getUserFriends } from '../functions/index';
import IndividualFriendIcon from './individualFriendIcon';

class ExclusiveProfileFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      cbResponce: false,
      friends: [
        { username: 'FRIEND 1', friendId: 1 },
        { username: 'FRIEND 2', friendId: 2 },
        { username: 'FRIEND 3', friendId: 3 },
        { username: 'FRIEND 4', friendId: 4 },
        { username: 'FRIEND 5', friendId: 5 }
      ]
    };
  }

  componentDidMount() {
    const userId = this.props.userId;
    getUserFriends(userId)
      .then(friends => {
        let friendsList = [];
        //add each userId
        for (let key in friends.data) {
          friendsList.push(key);
        }
        this.setState({ friends: friendsList });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { friends } = this.state;

    const RenderFriends = friends.map((friend, key) => (
      <IndividualFriendIcon friendId={friend.friendId} key={key} />
    ));

    return <div className="ui middle aligned divided list">{RenderFriends}</div>;
  }
}

export default ExclusiveProfileFriends;
