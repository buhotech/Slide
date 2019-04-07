import React, { Component } from 'react';

//getUserInfo
import { getUserProfileInfo } from '../../profileComponent/functions/index';

class IndividualFriendIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      profile_pic: '',
      error: false
    };
  }

  componentDidMount() {
    const friendId = this.props.friendId;
    // getUserProfileInfo(friendId)
    //     .then(user => {
    //         console.log(user)
    //         this.setState({})
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         this.setState({error: true})
    //     })
  }

  render() {
    // const {username, profile_pic} = this.state
    let username = this.props.friendId;
    return (
      <div className="individual-friend-icon">
        <h4>{username}</h4>
      </div>
    );
  }
}

export default IndividualFriendIcon;
