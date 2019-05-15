import React, { Component } from 'react';
import './styles/lobby.scss';

class Word extends Component {
  constructor(props) {
    super();
    this.state = {
      className: `unselectedKW`,
      keyContainerClass: 'keywordIcon',
      word: props.word,
      keywordId: props.keywordId,
      selected: false
    };
  }

  keywordClicked = () => {
    let currCN = this.state.className;
    let currTab = this.state.keyContainerClass;
    let currSelected = this.state.selected;
    let { keywordId } = this.state;

    let className = currCN === `unselectedKW` ? `selectedKW` : 'unselectedKW';
    let keyContainerClass = currTab === `keywordIcon` ? `keywordIcon selectedTab` : 'keywordIcon';

    if (currSelected === false) {
      this.props.addWord(keywordId);
    } else {
      this.props.removeWord(keywordId);
    }
    this.setState(prev => ({ className, keyContainerClass, selected: !prev.selected }));
  };

  render() {
    let { word, className, keyContainerClass } = this.state;
    return (
      <div className={keyContainerClass} onClick={this.keywordClicked}>
        <div className={className}>{word}</div>
      </div>
    );
  }
}

export default Word;
