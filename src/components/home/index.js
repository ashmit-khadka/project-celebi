import React, { useEffect, useContext, useState } from "react"
import ImageAvatar from "../../assets/images/home_avatar.png"
import Button from "../button"

import ImageNewChallenge from "../../assets/images/home_challenge.png"
import ImageNewChallenges from "../../assets/images/home_challenges.png"
import ImageNewSocial from "../../assets/images/home_social.png"
import { ReactComponent as IconAction } from "../../assets/icons/next.svg"

import { Link } from "react-router-dom"

import { useNavigate } from "react-router-dom"

import dataNinja from "../../utilities/axios"
import AppContext from "../../utilities/context"
import { ChallengeItem } from "../challengeList"
import { GroupItem } from "../screen/groupListScreen/GroupListScreen"

const Home = () => {

	const { user } = useContext(AppContext)
	const navigate = useNavigate()

	const [ shortcutChallenge, setShortcutChallenge ] = useState(null)
	const [ shortcutGroup, setShortcutGroup ] = useState(null)

	const getUserChallangeShortcut = async () => {
		const response = await dataNinja.get('/challenge/shortcut', {
			params: { 
				userId: user._id
			}
		 })
		 setShortcutChallenge(response.data)
	}

	const getUserGroupShortcut = async () => {
		const response = await dataNinja.get('/group/shortcut', {
			params: { 
				userId: user._id
			}
		 })
		 setShortcutGroup(response.data)
	}

	useEffect(() => {
		if (user?._id) {
			getUserChallangeShortcut()
			getUserGroupShortcut()
		}
	}, [user])

	console.log(user)

	const getMenuTile = ({ title, description, image, onClick, invert }) => (
		<div
			style={{
				display: "flex",
				width: "100%",
				flexDirection: invert ? "row-reverse" : "row",
			}}
			onClick={onClick}
		>
			<img
				style={{
					width: "50%",
					height: "180px",
					objectFit: "cover",
					boxShadow: `${invert ? '10px' : '-10px'} 10px 0px 0px #DC7A7A`, // Add this line

				}}
				src={image}
			/>
			<div
				style={{
					backgroundColor: 'black',
					color: 'white',
					padding: '1.5rem',
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				<div
					style={{
						fontWeight: 'bold',
						fontSize: '1.5rem',
						backgroundColor: 'black',
						color: 'white',

					}}
				>{title}</div>
				<div>{description}</div>
				<IconAction
					style={{
						width: '1rem',
						height: '1rem',
						fill: 'white',
						marginLeft: 'auto',
					}}
				/>
			</div>

		</div>
	)


	return (
		<div
			style={{
				background: 'linear-gradient(to bottom, #FFD597, #FFD1A7)', // Change this line
				height: '100vh', // Add this line
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "1rem",
					marginTop: "2rem"
				}}
			>
				<img
					style={{
						width: "100px",
						height: "100px",
						borderRadius: "50%"
					}}
					src={ImageAvatar}
				/>
				<h2
					style={{
						fontFamily: 'Libre Baskerville',
						fontSize: '2rem',
						fontWeight: '500',
						color: '#610000',


					}}
				>
					Welcome back{" "}
					<span style={{ fontWeight: '800' }}>
						Ash
					</span>
				</h2>
			</div>

			{/* <div>
				<GroupItem
					
				/>
			</div> */}
			<div
				className="list animation-fade-right"
				style={{
					marginTop: "2rem",
					gap: "2rem",
				}}
			>
				{shortcutChallenge && (
					<ChallengeItem
						_id={shortcutChallenge._id}
						title={shortcutChallenge.title}
						image={shortcutChallenge.image}
						points={shortcutChallenge.points}
					/>
				)}
				
				{shortcutGroup && (
					<GroupItem
						_id={shortcutGroup._id}
						name={shortcutGroup.name}
						image={shortcutGroup.image}
					/>				
				)}

				{getMenuTile({
					title: 'New challenge',
					description: 'Create a new challenge',
					image: ImageNewChallenge,
					onClick: () => {
						navigate('/new_challenge')
					}
				})}

				{getMenuTile({
					title: 'My challenges',
					description: 'View your active challenges',
					image: ImageNewChallenges,
					onClick: () => {
						navigate('/my_challenges')
					},
					invert: true
				})}

				{getMenuTile({
					title: 'Social',
					description: 'engage with the community',
					onClick: () => {
						navigate('/groups')
					},
					image: ImageNewSocial
				})}

			</div>
		</div>
	)
}

export default Home