import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import Button from "../button";

import axios from "axios";

const Challenge = (props) => {
    const { challenge } = props

    return (
        <div
            className="animation-fade-right"
        >

            <div>
            <h2
                style={{
                    position: 'relative',
                    padding: '1rem',
                    backgroundColor: 'black',
                    color: 'white',
                    fontFamily: 'Inconsolata',
                    fontSize: '2rem',
                    fontWeight: '500',
                    zIndex: 2,
                    width: "70%"
                }}
            >
                {challenge?.title}
            </h2>
            <img 
                style={{
                    position: 'relative',
                    height: '15rem',
                    width: '15rem',
                    marginTop: "-15px",
                    right: 0,
                    zIndex: 1,
                }}
                src={challenge?.image}
                alt={""}
            />
            <div 
                style={{
                    backgroundColor: '#DC7A7A',
                    padding: '1rem',
                    fontFamily: 'Inconsolata',
                    //fontSize: '1.4rem',
                    fontWeight: '500',
                    width: '90%',
                    marginTop: '-15px'

                }}
            >
                {challenge?.description}
            </div>

            </div>



        </div>
    )
}

export default Challenge