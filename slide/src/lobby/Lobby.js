import React, { Component } from 'react';
import Word from './Word';

//functions
import { joinLobby, sendLikes } from './functions/index';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbykey: '',
      stillLoadingWords: true,
      lobbyWords: [],
      selectedWords: [],
      amountCap: 2,
      message: '',
      moreLikes: true,
      error: false
    };
  }

  addWord = keywordId => {
    this.setState({ selectedWords: [...this.state.selectedWords, keywordId], message: '' });
  };

  removeWord = keywordId => {
    let { selectedWords } = this.state;
    let sanitizedWords = [];
    for (let wordid in selectedWords) {
      if (selectedWords[wordid] !== keywordId) {
        sanitizedWords.push(selectedWords[wordid]);
      }
    }
    this.setState({
      selectedWords: sanitizedWords
    });
  };

  checkLikes = async () => {
    let { amountCap, selectedWords, lobbykey } = this.state;
    let selectedLen = this.state.selectedWords.length;
    if (selectedLen < amountCap) {
      let likesAmountLeft = amountCap - selectedLen;
      this.setState({
        formComplete: false,
        message: `select ${likesAmountLeft} more like(s)`
      });
    } else {
      try {
        console.log(selectedWords);
        console.log('submit the likes to the database matching');
        let sendLikesRes = await sendLikes(selectedWords, lobbykey);

        console.log(sendLikesRes);
      } catch (err) {
        console.log(err);
        this.setState({
          error: true
        });
      }
    }
  };

  async componentDidMount() {
    try {
      let lobbyRes = await joinLobby();
      let words = lobbyRes.data.words;
      let lobbyKeywords = [];
      for (let word in words) {
        let obj = {
          keywordId: word,
          word: words[word].word
        };
        lobbyKeywords.push(obj);
      }

      if (lobbyRes.status === 200) {
        this.setState({
          lobbykey: lobbyRes.data.lobbyID,
          stillLoadingWords: false,
          lobbyWords: lobbyKeywords
        });
      } else {
        this.setState({
          error: true
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    //display grid with words_choices
    const { stillLoadingWords, lobbyWords, message } = this.state;

    let lobbyKeywordsGrid;

    if (!stillLoadingWords) {
      lobbyKeywordsGrid = lobbyWords.map((val, i) => {
        return (
          <Word
            key={i}
            word={val.word}
            keywordId={val.keywordId}
            addWord={this.addWord}
            removeWord={this.removeWord}
          />
        );
      });
    }

    return (
      <div className="lobby">
        <div className="grid-container">
          <h1 className="ui header">Pick Topics You Like</h1>

          <div className="grid-likes-container">{lobbyKeywordsGrid}</div>

          <div className="btn-section">
            <h2 className="err-message">{message}</h2>
            <button className="button like-btn" onClick={this.checkLikes}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
