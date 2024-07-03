import React, { useEffect, useState } from "react";
import ChallengeList from "../../challengeList";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const MyChallenges = () => {

    const [challenges, setChallenges] = useState([])
    const navigate = useNavigate();

    const getChallenges = () => {
        axios.get('http://localhost:5000/challenges')
            .then((res) => {
                console.log(res)
                setChallenges(res.data)
            })
    }

    const onClick = (challenge) => {
        navigate('/challenge', { state: { challengeId: challenge._id } });
    }

    useEffect(() => {
        getChallenges()
    }, [])
    

    return (
        <div>
            <div
                className="screen__header"
            >
                Your challenges
            </div>
            <div>
                <ChallengeList
                    challenges={challenges}
                    onClick={onClick}
                />

            </div>
        </div>
    )
}

export default MyChallenges