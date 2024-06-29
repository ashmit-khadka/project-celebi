import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useHistory

import AppContext from "../utilities/context";
import IconBack from "../assets/icons/back.svg";

const Breadcrumb = () => {
  const { pageMeta, setPageMeta } = useContext(AppContext);  
  const navigate = useNavigate(); // Get the history object
  const location = useLocation(); // Get the location object

  const [ showBack, setShowBack ] = useState(false)

  const handleBackClick = () => {
    navigate(-1) // Go back in history
  };

  useEffect(() => {
    setPageMeta({
      title: undefined
    });
    if (location.pathname === '/') {
      setShowBack(false)
    }
    else {
      setShowBack(true)
    }
  }, [location]);
  

    return (
        <div
          className="screen__container"
        >
            {showBack && (
              <img
                className="icon"
                style={{
                  marginBottom: '1rem',
                }}
                src={IconBack}
                alt="back"
                onClick={handleBackClick} // Add an onClick handler
                />
            )}

            {pageMeta?.title && (
              <div
                className="screen__header"
              >
                {pageMeta?.title}
              </div>
            
            )}
        </div>
    )
}

export default Breadcrumb