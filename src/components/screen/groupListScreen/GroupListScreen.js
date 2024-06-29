import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from "../../button";

const GroupListScreen = () => {

    const navigate = useNavigate();

    const [ groups, setGroups ] = useState([{}])
    
    const getGroups = () => {
        axios.get('http://localhost:5000/groups')
            .then((res) => {
                console.log(res)
                setGroups(res.data)
            })
    }

    useEffect(() => {

        getGroups()
    }, [])

    return (
        <div
            className="screen animation-fade-right"
        >
            <div
                className="screen__header"
            >
                Your groups
            </div>
            <div
                className="list"
            >
                {groups.map((group) => (
                    <div
                        onClick={() => {
                            navigate('/group', { state: { groupId: group._id } });
                        }}

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
                            src={group.image}
                        />
                        <div
                            className="font__lasrge"
                        >
                            {group.name}
                        </div>
                    </div>
                ))}

            </div>
            <Button 
                text="Find group"
                onClick={() => {
                    navigate('/group/find')
                }}
            />
            <Button 
                text="Create group"
                onClick={() => {
                    navigate('/group/create')
                }}
            />
        </div>
    )
}

export default GroupListScreen