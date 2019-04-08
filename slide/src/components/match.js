import React, { Component } from 'react';
import { Grid, Image, Segment, Divider, Transition } from 'semantic-ui-react';
import axios from '../utlities/axios';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {},
      otherUser: {},
      visible: false
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

  render() {
    const { me, otherUser, visible } = this.state;
    return (
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Transition visible={visible} animation="fly right" duration={800}>
              <div>
                <Image
                  className="leftMatch"
                  size="medium"
                  rounded
                  centered
                  src={me.profile_pic}
                  alt="profile1"
                />
                {me.username}
              </div>
            </Transition>
          </Grid.Column>
          <Grid.Column>
            <Transition visible={visible} animation="fly left" duration={800}>
              <div>
                <Image
                  className="rightMatch"
                  size="medium"
                  rounded
                  centered
                  src={otherUser.profile_pic}
                  alt="profile2"
                />
                {otherUser.username}
              </div>
            </Transition>
          </Grid.Column>
        </Grid>
        <Divider vertical>It's a match</Divider>
      </Segment>
    );
  }
}

export default Match;
