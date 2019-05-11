import React, { Component } from 'react';
import Word from './Word';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stillLoadingWords: true,
      wordChoices: [
        'a first (word || topic)',
        'a second (word || topic)',
        'a third (word || topic)',
        'a fourth (word || topic)',
        'a fifth (word || topic)',
        'a sixth (word || topic)',
        'a seventh (word || topic)',
        'an eighth (word || topic)',
        'a ninth (word || topic)',
        'a tenth (word || topic)',
        'an eleventh (word || topic)',
        'a twelfth (word || topic)'
      ],
      selectedWords: []
    };
  }

  addWord = event => {
    console.log(event);
    const { value } = event.target;
    this.setState({ selectedWords: [...this.state.selectedWords, value] });
  };

  componentDidMount() {
    //  call ->
    //     lilchat/ +  this.props.lobbyKey  + /gamewords -> response
    //         -->setState("wordChoices":response)
  }

  componentWillMount = () => {
    // fetch()
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ stillLoadingWords: false, words: res.formData.WORDS_FROM_BACKEND });
    //   })
    //   .catch(err => console.log(err));
    //
    // NOTE: LINE BELOW IS ONLY HERE TO TEST LOADING SCREEN, UNTIL ASYNC CALL INCLUDED
    // this.setState({ stillLoadingWords: false });
  };

  onSubmit() {
    // lilchat/ this.props.lobbykey /sendmylikes/
    //   body: selectedWords.join(',');
  }

  render() {
    //display grid with words_choices
    const { stillLoadingWords, wordChoices } = this.state;
    return (
      <div>
        <h1 className="ui header">Pick Topics You Like</h1>
        <div className="ui celled divided grid container">
          {wordChoices.map((word, key) =>
            stillLoadingWords ? (
              <div className="five wide column">
                <div className="ui placeholder">
                  <div className="line" />
                  <div className="line" />
                  <div className="line" />
                </div>
              </div>
            ) : (
              <div className="five wide column">
                <Word
                  className="ui button"
                  body={word}
                  name="wordChoices"
                  value={wordChoices[key]}
                  onClick={this.addWord.bind(this)}
                />
              </div>
            )
          )}
        </div>
        <button className="ui bottom attached button" onClick={this.onSubmit.bind(this)}>
          DONE
        </button>
      </div>
    );
  }
}

export default Lobby;
