import React from 'react';

function Advice({ question, text, highlights,id }){
  const regex = new RegExp(`(${highlights.join('|')})`, 'g');

  const highlightedAnswer = text.replace(regex, (match) => `<span class='highlight'>${match}</span>`);
  return (
    <div className="advice" id={id}>
      <h2>{question}</h2>
      <p dangerouslySetInnerHTML={{ __html: highlightedAnswer }} />
    </div>
  );
};

export default Advice;
