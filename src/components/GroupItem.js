import React from "react";
import PropTypes from 'prop-types';


const GroupItem = (props) => {
  const { name, image, onClick } = props;

  return (
    <div
      onClick={onClick}

      style={{
        //position: 'absolute',
        backgroundColor: 'black',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        fontFamily: 'Inconsolata',
        fontWeight: '500',
        //fontSize: '1.5rem',
        boxShadow: '-10px 12px 0px 0px #DC7A7A', // Add this line
        marginBottom: '10px'
      }}
    >
      <img
        style={{
          height: '5rem',
          width: '5rem'
        }}
        src={image}
      />
      <div
        className="font__lasrge"
      >
        {name}
      </div>
    </div>
  )
}

GroupItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  onClick: PropTypes.func,
};

export default GroupItem;