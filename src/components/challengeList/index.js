import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const ChallengeList = (props) => {
    const { updateScreen, screenData, challenges, onClick } = props

    const navigate = useNavigate();
    console.log(challenges)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            {challenges.map(c => 
                <div
                    className="animation-fade-right-slow"
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '1rem',
                        display: 'flex',
                        gap: '1rem',
                        fontFamily: 'Inconsolata',
                        fontWeight: '500',
                        fontSize: '1.6rem',
                        boxShadow: '-10px 12px 0px 0px #DC7A7A', // Add this line
                        marginBottom: '10px'
                    }}
                    onClick={() => {
                        onClick(c)
                        //navigate('/challenge', { state: { challengeId: c._id } });
                    }}
                    >
                    <img 
                        style={{
                            height: '5rem',
                            width: '5rem'
                        }}
                        src={c.image}
                        alt={c.title}
                    />
                    <div>

                        <div>{c.title}</div>
                        <div>Points: {c.points}</div>

                    </div>

                </div>

                )}
    
        </div>
    )
}

export default ChallengeList