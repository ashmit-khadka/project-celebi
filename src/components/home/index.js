import React from "react"
import ImageAvatar from "../../assets/images/home_avatar.png"
import Button from "../button"

import ImageNewChallenge from "../../assets/images/home_challenge.png"
import ImageNewChallenges from "../../assets/images/home_challenges.png"
import ImageNewSocial from "../../assets/images/home_social.png"

import { Link } from "react-router-dom"

const Home = () => {
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
						width: "150px",
						height: "150px",
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
			<div
				className="list animation-fade-right"
			>
				<Link
					to={`new_challenge`}
				>
					<div
						className="home-tile__container"
						style={{
							//boxShadow: '-10px 12px 0px 0px #57dce3'

						}}
					>
						<img
							className="home-tile__image"
							src={ImageNewChallenge}
						></img>
						<div
							className="home-tile__button"
							style={{
								bottom: '1rem',
								left: '1rem',
								//transform: 'translateX(-50%)',
							}}
						>
							New challenge
						</div>
					</div>
				</Link>
				<Link
					to={`my_challenges`}
				>
					<div
						className="home-tile__container"
					>
						<img
							className="home-tile__image"
							src={ImageNewChallenges}
						></img>
						<div
							className="home-tile__button"
							style={{
								top: '1rem',
								right: '1rem',
								//transform: 'translateX(-50%)',
							}}
						>
							My challenges
						</div>
					</div>
				</Link>

				<Link
					to={`groups`}
				>

					<div
						className="home-tile__container"
					>
						<img
							className="home-tile__image"
							src={ImageNewSocial}
						></img>
						<div
							className="home-tile__button"
							style={{
								top: '1rem',
								left: '1rem',
								//transform: 'translateX(-50%)',
							}}
						>
							Social
						</div>
					</div>
				</Link>

			</div>
		</div>
	)
}

export default Home