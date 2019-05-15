import React, { Component } from 'react';

import Word from './Word';

//functions
import { joinLobby, sendLikes, sendGuess } from './functions/index';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobbykey: '',
      stillLoadingWords: true,
      lobbyWords: [],
      selectedWords: [],
      amountCap: 2,
      moreLikes: true,
      message: '',
      formComplete: true
    };
  }

  addWord = keywordId => {
    this.setState({
      selectedWords: [...this.state.selectedWords, keywordId],
      message: '',
      formComplete: true
    });
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

        let sendLikesRes = await sendLikes(selectedWords, lobbykey);

        console.log(sendLikesRes);

        if (sendLikesRes.status === 200) {
          let data = sendLikesRes.data;
          if (data.status === `Match found..`) {
            let ch_id = 'guessing-' + data.ChatID;
            localStorage.setItem(ch_id, false);
            this.props.history.push({
              pathname: '/match-test',
              state: {
                user1: data.members[0],
                user2: data.members[1],
                chatId: data.ChatID
              }
            });
          } else {
            localStorage.setItem('waitingForMatch', true);
            this.props.history.push(`/`);
          }
        }
      } catch (err) {
        console.log(err);
        this.setState({
          error: true
        });
      }
    }
  };

  checkGuess = async () => {
    let { amountCap, selectedWords, lobbykey } = this.state;
    let selectedLen = this.state.selectedWords.length;
    if (selectedLen < 1) {
      let likesAmountLeft = amountCap - selectedLen;
      this.setState({
        formComplete: false,
        message: `select ${likesAmountLeft} more like(s)`
      });
    } else {
      try {
        console.log(selectedWords);
        console.log('submit the guess to the database');
        let sendGuessRes = await sendGuess(selectedWords, this.props.chat_id);

        this.props.setGuessingState(sendGuessRes.data.status);
        //  console.log();
      } catch (err) {
        console.log(err);
        this.setState({
          error: true
        });
      }
    }
  };

  async componentDidMount() {
    if (this.props._type && this.props._type === 'guessing') {
      console.log('matching..', this.props.words);
      this.setState({ lobbyWords: this.props.words, stillLoadingWords: false });
    } else {
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
          //console.log(lobbyRes);
          localStorage.setItem('lobbyID', lobbyRes.data.lobbyID);
        } else {
          this.setState({
            error: true
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    //display grid with words_choices
    const { stillLoadingWords, lobbyWords, message, formComplete } = this.state;

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

    let DoneBtn, titleClass;

    if (formComplete) {
      DoneBtn = <span>Done</span>;
      titleClass = ``;
    } else {
      titleClass = `err-message`;
      DoneBtn = <h2 className={titleClass}>{message}</h2>;
    }

    let lobby = (
      <div className="lobby_div">
        <div className="header">
          <h1 className={titleClass}>Select your likes</h1>
        </div>

        <div className="likes-container">
          <div className="grid-likes-container">{lobbyKeywordsGrid}</div>
        </div>

        <div className="btn-section_">
          <button
            className="button_ like-btn_"
            onClick={
              this.props._type && this.props._type === 'guessing'
                ? this.checkGuess
                : this.checkLikes
            }
          >
            {DoneBtn}
          </button>
        </div>
      </div>
    );

    return (
      <div className="lobby">
        <div className="grid-container">{lobby}</div>
      </div>
    );
  }
}

export default Lobby;
