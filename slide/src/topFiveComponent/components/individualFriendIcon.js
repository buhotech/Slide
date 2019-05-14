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
    const friendId = this.props;
    // getUserProfileInfo(friendId)
    //     .then(user => {
    //         console.log(user)
    //         this.setState({username: ``})
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         this.setState({error: true})
    //     })
  }

  render() {
    // const {username, profile_pic} = this.state
    const username = this.props;
    return (
      <div className="item individual-friend-icon">
        <img className="ui avatar placeholder image" />
        <div className="content">
          <h4>{username}</h4>
          <div className="ui header">Daniel Louise</div>
        </div>
      </div>
    );
  }
}

export default IndividualFriendIcon;
