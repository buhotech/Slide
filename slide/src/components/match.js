import React, { Component } from 'react';
import { Reveal, Header, Dimmer, Image, Segment, Divider, Transition } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';

import './styles/styles.scss';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: '',
      otherUser: '',
      visible: false,
      active: true,
      redirect: false,
      chatId: ''
    };
  }

  componentDidMount() {
    this.setState({
      visible: true,
      chatId: this.props.location.state.chatId,
      me: this.props.location.state.user1,
      otherUser: this.props.location.state.user2
    });

    setTimeout(() => {
      this.setState({
        redirect: true
      });
    }, 4000);
  }

  handleOpen = () => this.setState({ active: true });

  render() {
    const { me, otherUser, visible, redirect, active, chatId } = this.state;
    let imgURL = `https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png`;
    console.log(redirect);
    if (redirect) {
      return <Redirect to={`/chats/${chatId}`} />;
    }

    return (
      <div>
        <Dimmer active={active} page>
          <div style={{ display: 'inline-block', padding: '80px' }}>
            <Transition visible={visible} animation="fly right" duration={800}>
              <div>
                <Image
                  className="rightMatch"
                  size="small"
                  circular
                  centered
                  src={imgURL}
                  alt="profile2"
                />
                <h2 className="username-match">{otherUser}</h2>
              </div>
            </Transition>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Transition visible={visible} animation="fly left" duration={800}>
              <div style={{ padding: '80px' }}>
                <Image
                  className="rightMatch"
                  size="small"
                  circular
                  centered
                  src={imgURL}
                  alt="profile2"
                />
                <h2 className="username-match">{me}</h2>
              </div>
            </Transition>
          </div>
          <Divider hidden vertical>
            <Transition visible={visible} animation="fade" duration={1100}>
              <Header as="h1" color="yellow">
                It's a Match!
              </Header>
            </Transition>
          </Divider>
        </Dimmer>
      </div>
    );
  }
}

export default Match;
