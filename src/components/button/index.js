import React from "react";

const Button = (props) => {
    const { text, onClick, style } = props

    return (
        <div
            style={{
                backgroundColor: 'black',
                width: 'fit-content',

                color: 'white',
                padding: '1rem',
                fontFamily: 'Inconsolata',
                //fontSize: '1.1rem',
                //fontWeight: '300',

                ...style
            }}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

export default Button