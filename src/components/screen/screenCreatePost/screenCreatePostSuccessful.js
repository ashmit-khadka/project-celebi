/**
 * @name ScreenCreatePost
 * @description Create a new post
 */


import React from "react";
import Button from "../../button";
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'

const ScreenCreatePostSuccessful = () => {

    const navigate = useNavigate();

    return (
        <div
        className="animation-fade-right"

        >

<div
				className="screen__header"
			>
				Complete challenge
			</div>
            <Confetti
            numberOfPieces={100}
            gravity={0.1}
            />

            <div>
                <img
                    src="https://celebi-kcl.s3.eu-north-1.amazonaws.com/gifs/complete_challenge.gif"
                />
            </div>

            <Button
                text="Go home"
                onClick={() => {
                    navigate("/")
                }}
                style={{
                    marginTop: '1rem'
                }}
            />

        </div>
    )
}
export default ScreenCreatePostSuccessful