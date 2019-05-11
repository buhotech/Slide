import React, { Component } from 'react';

class WordChoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // if necessary, to load placeholder
      stillLoadingWords: true,
      words: []
    };
  }

  componentWillMount = () => {
    // fetch()
    //   .then(res => {
    //     console.log(res);
    //     this.setState({ stillLoadingWords: false, words: res.formData.WORDS_FROM_BACKEND });
    //   })
    //   .catch(err => console.log(err));
  };

  render() {
    const { stillLoadingWords } = this.state;
    return stillLoadingWords ? (
      <div>words</div>
    ) : (
      <div>
        <h1 className="ui header">Pick Topics You Like</h1>
        <div className="ui celled divided grid container">
          <div className="five wide column">
            <div className="ui button">a word</div>
          </div>
          <div className="five wide column">a first (word || topic)</div>
          <div className="five wide column">a second (word || topic)</div>
          <div className="five wide column">a third (word || topic)</div>
          <div className="five wide column">a fourth (word || topic)</div>
          <div className="five wide column">a first (word || topic)</div>
          <div className="five wide column">a second (word || topic)</div>
          <div className="five wide column">a third (word || topic)</div>
          <div className="five wide column">a fourth (word || topic)</div>
          <div className="five wide column">a first (word || topic)</div>
          <div className="five wide column">a second (word || topic)</div>
          <div className="five wide column">a third (word || topic)</div>
        </div>
        <div className="ui bottom attached button">DONE</div>
      </div>
    );
  }
}

export default WordChoices;
