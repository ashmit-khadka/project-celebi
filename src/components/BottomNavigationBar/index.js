import React from "react";

import IconChallenge from '../../assets/icons/idea.svg'
import IconSocial from '../../assets/icons/bubble-chat.svg'
import IconChallenges from '../../assets/icons/goal.svg'

import { useLocation } from "react-router-dom";

const BottomNavigationBar = () => {

	const location = useLocation();	

	if (location.pathname === '/login') {
		return null
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				padding: '1rem',
				gap: '3rem',
			}}
		>
			<img
				style={{
					width: '2.4rem',
					height: '2.4rem',
				}}
				src={IconChallenge}
				alt="idea"
			/>

			<img
				style={{
					width: '2.4rem',
					height: '2.4rem',
				}}
				src={IconChallenges}
				alt="idea"
			/>

			<img
				style={{
					width: '2.4rem',
					height: '2.4rem',
				}}
				src={IconSocial}
				alt="idea"
			/>
		</div>
	)
}

export default BottomNavigationBar