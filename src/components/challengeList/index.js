import React from "react"
import { useNavigate } from "react-router-dom"

const ChallengeList = (props) => {
	const { challenges, onClick } = props

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			{challenges.map(c =>
				<ChallengeItem
					key={c._id}
					_id={c._id}
					title={c.title}
					image={c.image}
					points={c.points}
					onClick={() => onClick ? onClick(c) : null}
				/>
			)}
		</div>
	)
}

const ChallengeItem = (props) => {
	const { _id, title, image, points, onClick } = props

	const navigate = useNavigate()

	const test = () => {
		console.log('test')
	}

	return (
		<div
			className="animation-fade-right-slow item__container"
			style={{

			}}
			onClick={onClick || navigate('/challenge', { state: { challengeId: _id } })}
			
		>
			<img
				style={{
					height: '5rem',
					width: '5rem'
				}}
				src={image}
				alt={title}
			/>
			<div>

				<div
					className="item__name"

				>{title}</div>
				<div>
					Points: {points}
				</div>
			</div>
		</div>
	)
}

export default ChallengeList;
export { ChallengeItem };