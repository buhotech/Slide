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
      friends: []
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

    const RenderFriends = friends.map(friendId => {
      return <IndividualFriendIcon friendId={friendId} key={friendId} />;
    });

    return (
      <div className="friends-profile">
        <br />
        <h2>Top Five</h2>
        {RenderFriends}
      </div>
    );
  }
}

export default ExclusiveProfileFriends;
