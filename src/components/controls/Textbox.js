import React from 'react';

const Textbox = ({ text, handleTextChange }) => {
  return (
    <textarea
      style={{
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'Inconsolata',
        fontSize: '1.2rem',
        height: '5rem',
        width: '100%',
        padding: '.5rem'
      }}
      value={text}
      onChange={handleTextChange}
    ></textarea>
  );
};

export default Textbox;