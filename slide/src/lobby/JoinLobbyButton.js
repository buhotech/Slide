import React from 'react';

const JoinLobbyButton = () => {
  return (
    <div className="ui center aligned basic segment">
      <div className="ui left icon action input">
        <div className="ui blue submit button">Start Game</div>
      </div>
      <div className="ui horizontal divider">Or</div>
      <div className="ui teal button">Current Chat</div>
    </div>
  );
};

export default JoinLobbyButton;
