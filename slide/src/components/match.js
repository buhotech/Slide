import React, { Component } from 'react';
import { Reveal, Header, Dimmer, Image, Segment, Divider, Transition } from 'semantic-ui-react';
import axios from '../utlities/axios';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {},
      otherUser: {},
      visible: false,
      active: true
    };
  }

  componentDidMount() {
    const userId = `12345`;
    axios.get(`users/${userId}/user_info/`).then(user => {
      const { bio, profile_pic, username } = user.data;
      const userInfo = { bio, profile_pic, username };
      this.setState({ me: userInfo, otherUser: userInfo });
    });
    this.setState({ visible: true });
  }

  handleOpen = () => this.setState({ active: true });

  handleClose = () => this.setState({ active: false });

  render() {
    const { me, otherUser, visible } = this.state;
    const { active } = this.state;

    return (
      <div>
        <Header as="h1">Other Activity on Slide</Header>
        <Dimmer active={active} onClickOutside={this.handleClose} page>
          <div style={{ display: 'inline-block', padding: '80px' }}>
            <Transition visible={visible} animation="fly right" duration={800}>
              <div>
                <Image
                  className="leftMatch"
                  size="medium"
                  circular
                  centered
                  src={me.profile_pic}
                  alt="profile1"
                />
                {me.username}
              </div>
            </Transition>
          </div>
          <div style={{ display: 'inline-block', padding: '80px' }}>
            <Transition visible={visible} animation="fly left" duration={800}>
              <div>
                <Image
                  className="rightMatch"
                  size="medium"
                  circular
                  centered
                  src={otherUser.profile_pic}
                  alt="profile2"
                />
                {otherUser.username}
              </div>
            </Transition>
          </div>
          <Divider hidden vertical>
            <Transition visible={visible} animation="fade" duration={1100}>
              <Header as="h4" color="yellow">
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
