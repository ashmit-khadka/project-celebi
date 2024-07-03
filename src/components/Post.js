import React, { useState, useContext, useMemo } from "react";
import { ReactComponent as IconLike } from "../assets/icons/love.svg";
import { ReactComponent as IconComment } from "../assets/icons/chat.svg";
import Textbox from "./controls/Textbox";
import AppContext from "../utilities/context";
import dataNinja from "../utilities/axios";
import Button from "./button";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Post = (props) => {
	const { id, title, likes, user, image, comments, onClick, challenge, preview, timestamp } = props

	const navigate = useNavigate();
	const [comment, setComment] = useState('');
	const { user: currentUser, notify } = useContext(AppContext);
	const [currentComments, setCurrentComments] = useState([...comments]);
	const [currentLikes, setCurrentLikes] = useState([...likes]);

	const getComments = () => {
		dataNinja.get('/post/comment', {
			params: {
				postId: props.id,
				userId: currentUser._id,
				text: comment,
			}
		})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}

	const onProfileClick = () => {
		navigate('/profile', { state: { user: user._id } })
	}

	const postComment = async () => {
		const response = await dataNinja.post('/post/comment', {
			text: comment,
			userId: currentUser._id,
			postId: id,
		})

		console.log(response)
		setCurrentComments([...response.data.comments])
		setComment('')
	}

	const toggleLike = async () => {
		const response = await dataNinja.post('/post/like', {
			userId: currentUser._id,
			postId: id,
		})
		setCurrentLikes([...response.data.likes])
		notify("Liked!")
	}

	const isLiked = useMemo(() => {
		return currentLikes.some(like => like.user === currentUser._id);
	}, [currentLikes, currentUser])


	const copyChallenge = async () => {
		const response = await dataNinja.post('/post/copy-challenge', {
			challengeId: challenge,
			userId: currentUser._id,
		})

		console.log(response)
		navigate('my_challenges')

	}

	return (
		<div
			style={{
				fontFamily: 'Inconsolata',
				fontSize: '1.4rem',
			}}
		>


			<div
				style={{
					display: 'flex',
					padding: '1rem 0',
					alignItems: 'center',
					gap: '1rem',
				}}
				onClick={onProfileClick}
			>
				<img
					style={{
						width: '70px',
						height: '70px',
						borderRadius: '50%'
					}}
					src={user?.image}
					alt={user?.name}
				/>
				<div>
					<div
						style={{
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
						}}
					>{user?.name}
						<div
							style={{
								width: '.3rem',
								height: '.3rem',
								backgroundColor: '#4b4b4b',
								borderRadius: '50%',
								margin: '0 .75rem',
							}}
						>
						</div>
						<div
							style={{
								fontSize: '1rem',
								fontWeight: 'normal',
							}}
						>
							{moment(timestamp).fromNow()}
						</div>
					</div>
					<div>Level {user?.level}</div>
				</div>
			</div>
			<div
				onClick={onClick}

			>
				<h3
					style={{
						padding: '1rem',
						fontSize: '1.5rem',
						fontWeight: '500',
						backgroundColor: 'black',
						color: 'white',
					}}
				>{title}</h3>

				<img
					style={{
						width: '100%',
						height: '250px',
						objectFit: 'cover'
					}}
					src={image}
					alt={title}
				/>
			</div>
			<div>

			</div>
			{/* Post controlls */}
			<div
				style={{
					display: 'flex',
					gap: '1rem',
					padding: '1rem 0',
				}}
			>
				<div
					style={{
						display: 'flex',
						gap: '0.5rem',
						alignItems: 'center',
					}}
				>
					<IconLike
						style={{
							width: '2rem',
							height: '2rem',
							fill: isLiked ? 'red' : 'black',
						}}
						onClick={toggleLike}
					/>
					{currentLikes?.length}
				</div>

				<div
					style={{
						display: 'flex',
						gap: '0.5rem',
						alignItems: 'center',
					}}
				>
					<IconComment
						style={{
							width: '1.9rem',
							height: '1.9rem',
						}}
					/>
					{currentComments?.length}

				</div>
			</div>
			{!preview && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1rem',
					}}
				>
					{/* Post description */}
					<div
						style={{
							padding: '1rem',
							backgroundColor: '#DC7A7A',
							color: 'black',
						}}
					>
						ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae odio. ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae odio
					</div>
					<Button
						text="Copy challenge"
						onClick={copyChallenge}
					/>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							alignItems: 'center',
						}}
					>
						<div>
							<img
								style={{
									width: '3rem',
									height: '3rem',
									objectFit: 'cover',
									borderRadius: '50%'
								}}
								src={currentUser?.image}
								alt={currentUser?.name}
							/>
						</div>
						<Textbox
							text={comment}
							handleTextChange={(e) => {
								setComment(e.target.value)
							}}

						/>
						<div
							onClick={postComment}
						>
							Post
						</div>
					</div>
					{/* Comments */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
							marginTop: '1rem',
						}}
					>
						{currentComments?.map(comment => (
							<div
								style={{
									display: 'flex',
									gap: '1rem',
									alignItems: 'center',
								}}
							>
								<div>
									<img
										style={{
											width: '3rem',
											height: '3rem',
											objectFit: 'cover',
											borderRadius: '50%'
										}}
										src={comment?.user?.image}
										alt={comment?.user?.name}
									/>
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '.5rem',

									}}
								>
									<div
										style={{
											fontWeight: 'bold',
											display: 'flex',
											alignItems: 'center',
										}}
									>{comment?.user?.name}
										<div
											style={{
												width: '.3rem',
												height: '.3rem',
												backgroundColor: '#4b4b4b',
												borderRadius: '50%',
												margin: '0 .75rem',
											}}
										>
										</div>
										<div
											style={{
												fontSize: '1rem',
												fontWeight: 'normal',
											}}
										>
											{moment(comment.timestamp).fromNow()}
										</div>
									</div>
									<div>{comment?.text}</div>
								</div>
							</div>
						))}
					</div>

				</div>
			)}
		</div>
	)

}

export default Post