import React from 'react';

import { ReactComponent as IconLike } from '../assets/icons/love.svg';


const Notification = () => {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'black',
        color: 'white',
        padding: '1rem',
        gap: '1rem',
        boxShadow: '-10px 12px 0px 0px #DC7A7A', // Add this line
      }}
    >
      <div>
      <IconLike style={{ fill: 'white', width: '2rem', height: '2rem' }} />
            </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          Like
        </div>
        <div>
          Alice liked your post
        </div>

      </div>
    </div>
  );
}

export default Notification;