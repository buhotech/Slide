import React from 'react';

const Word = parentProps => {
  const { className, body, onClick } = parentProps;
  return (
    <button className={className} onClick={onClick} {...parentProps}>
      {body}
    </button>
  );
};

export default Word;
