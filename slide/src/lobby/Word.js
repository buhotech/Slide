import React from 'react';

const Word = parentProps => {
  const { className, body } = parentProps;
  return <div className={className}>{body}</div>;
};

export default Word;
