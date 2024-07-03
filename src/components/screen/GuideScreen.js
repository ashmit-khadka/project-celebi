import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Textbox from "../controls/Textbox";
import axios from 'axios';
import { ClimbingBoxLoader } from "react-spinners";
import dataNinja from "../../utilities/axios";
import AppContext from "../../utilities/context";

import ImageReggie from "../../assets/images/reggie.png";
import IconBack from "../../assets/icons/back.svg";

const GuideScreen = () => {

  const location = useLocation();
  const { user, guide, setGuide } = useContext(AppContext);

  const [text, setText] = useState('how can I reduce paper waste');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message, initial = false) => {
    try {
        setLoading(true);

        const updatedConversation = [
          ...conversation,
          { role: 'user', content: message },

        ];

        const response = await dataNinja.post('/ai/start', { message, conversation });
        console.log(response);
        updatedConversation.push({ role: 'assistant', content: response.data.message });
        setConversation(updatedConversation);
        setText('');
        setLoading(false)

      
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleBackClick = () => { 
    setGuide(null);
  }

  useEffect(() => {
    console.log(guide?.prompt, loading, conversation);
    if (guide?.prompt && conversation.length === 0) {
      sendMessage(guide?.prompt, true);

    }
  }, [guide?.prompt]);

  if (!guide) {
    return
  }


  return (
    <div
      style={{
        position: 'fixed', // Use 'fixed' positioning
        top: 0, // Position at the top
        left: 0, // Position on the left
        right: 0, // Stretch to the right
        bottom: 0, // Stretch to the bottom
        zIndex: 100, // Use a high zIndex to make sure it's on top of other elements
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to bottom, #FFD597, #FFD1A7)', // Change this line
        padding: '1rem 1.5rem',

      }}
    >
      <div>
      <img
						style={{
							width: '2rem',
							height: '2rem',
							marginRight: '1rem'
						}}
						onClick={handleBackClick} // Add an onClick handler
						src={IconBack} alt="menu" />				

      </div>
      <div>
        <h2
          className="screen__header"
        >
          Ask Reggie
        </h2>
        {loading && (
          <ClimbingBoxLoader color="#610000" />
        )}
        {conversation.map((message, index) => (
          <div
            style={{
              display: 'flex',
            }}
          >
            {message.role === 'assistant' && (
              <img

                style={{ width: 50, height: 50, borderRadius: '50%' }}
                src={ImageReggie}
                alt="Profile Picture"
              />
            )}

            {message.role === 'user' && (
              <img

                style={{ width: 50, height: 50, borderRadius: '50%' }}
                src={user?.image}
                alt="Profile Picture"
              />
            )}
            <div key={index}>{message.content}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div>
          <img

            style={{ width: 50, height: 50, borderRadius: '50%' }}
            src={user?.image}
            alt="Profile Picture"
          />
        </div>
        <div>
          <input type="text" value={text} onChange={handleInputChange} />
          <button onClick={() => sendMessage(text)}>Send</button>

        </div>
      </div>
    </div>
  );
};

export default GuideScreen;