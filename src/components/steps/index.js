import React from "react";

const Steps = (props) => {
    const { steps, currentStep } = props

    
    return (
        <div 
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2rem'
            }}
        >
            {Array.from({ length: steps }, (_, i) => (
                <div style={{
                    height: '20px',
                    width: '20px',
                    backgroundColor: i >= currentStep ? '#C78686' : '#610000',
                    borderRadius: '50%'
                }} 
                 key={i}></div>
            ))}
        </div>
    )
}


export default Steps