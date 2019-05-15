import React, { Component } from 'react';

import { Image, Transition } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class WinLoseComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      visible: false,
      currentUser: localStorage.getItem('username'),
      winStatus: false,
      redirect: false
    };
  }

  componentDidMount() {
    this.setState({
      visible: true,
      winStatus: this.props.location.state.winStatus,
      winMessageStatus: false
      // chatId: this.props.location.state.chatId,
    });

    setTimeout(() => {
      this.setState({
        redirect: true
      });
    }, 3000);
  }

  render() {
    const { currentUser, visible, redirect, winStatus } = this.state;

    let imgURL = `https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png`;

    let winClass, winMessageStatus;
    if (winStatus) {
      winClass = 'win-status';
      winMessageStatus = `You Win, Play Again!`;
    } else {
      winClass = 'lose-status';
      winMessageStatus = `You guessed wrong, Play Again!`;
    }

    if (!redirect) {
      return (
        <div className="winlose-bg">
          <div className="winlose-container">
            <Transition visible={visible} animation="fade up" duration={800}>
              <div>
                <Image
                  className="rightMatch"
                  size="small"
                  circular
                  centered
                  src={imgURL}
                  alt="profile2"
                />
                <h2 className="username-match">{currentUser}</h2>
              </div>
            </Transition>
          </div>

          <div className="bottom-message">
            <Transition visible={visible} animation="fade" duration={1100}>
              <h1 className={winClass}>{winMessageStatus}</h1>
            </Transition>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default WinLoseComponent;
