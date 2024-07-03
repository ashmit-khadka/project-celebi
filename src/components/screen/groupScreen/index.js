import React, { useEffect, useMemo, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import Post from "../../Post";

import IconLeaderboard from "../../../assets/icons/podium.svg";
import IconPosts from "../../../assets/icons/post.svg";
import Button from "../../button";

import AppContext from "../../../utilities/context";
import dataNinja from "../../../utilities/axios";

const GroupScreenStates = {
	POSTS: "POSTS",
	LEADERBOARD: "LEADERBOARD",
}
const GroupScreen = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const { user, notify } = useContext(AppContext);

	const [group, setGroup] = useState([])
	const [screenState, setScreenState] = useState(GroupScreenStates.POSTS)

	const getGroupPosts = () => {
		axios.get('http://localhost:5000/group/posts', {
			params: {
				id: location.state?.groupId
			}
		})
			.then(response => {
				console.log(response.data);
				setGroup(response.data)
			})
			.catch(error => {
				console.error(error);
			});
	}



	useEffect(() => {
		getGroupPosts()
	}, [])

	const toggleScreenState = () => {
		if (screenState === GroupScreenStates.POSTS) {
			setScreenState(GroupScreenStates.LEADERBOARD)
		} else {
			setScreenState(GroupScreenStates.POSTS)
		}
	}

	const isUserInGroup = useMemo(() => {
		if (group?.info?.users === undefined || !user?._id === undefined) return undefined
		return group.info.users?.includes(user?._id)
	}, [group])

	const isUserGroupOwner = group?.info?.owner === user?._id

	console.log(isUserInGroup)

	const leaveGroup = async () => {
		try {
			const response = await dataNinja.get('/group/leave', {
				params: {
					group: location.state?.groupId,
					user: user?._id
				}
			});
			console.log(response.data);
			navigate('/groups')
			notify('Left group!')
		} catch (error) {
			console.error('Error leaving group', error);
		}
	}

	const joinGroup = async () => {
		try {
			const response = await dataNinja.get('/group/join', {
				params: {
					group: location.state?.groupId,
					user: user?._id
				}
			});
			console.log(response.data);
			getGroupPosts()
			notify('Joined group!')
		} catch (error) {
			console.error('Error joining group', error);
		}
	}

	const deleteGroup = async () => {
		try {
			const response = await dataNinja.get('/group/delete', {
				params: {
					group: location.state?.groupId,
					user: user?._id
				}
			});
			console.log(response.data);
			navigate('/groups')
			notify('Deleted group!')
		} catch (error) {
			console.error('Error joining group', error);
		}
	}


	return (
		<div
			className="screen animation-fade-right"
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",

			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "end",
					gap: "1rem",
					alignItems: "start",
				}}
			>
				<img
					style={{
						width: "100px",
						height: "100px",
						objectFit: "cover",

					}}
					src={group.info?.image}
					alt={group.info?.name}
				/>
				<div
					
				>
					<div
						className="header__page"
					>
						{group.info?.name}
					</div>
					<div
						className="header__description"
					>{group.info?.description}</div>

				</div>
			</div>
			<div
				className="list"
			>
				<Button
					text={screenState === GroupScreenStates.POSTS ? "View leaderboard" : "View posts"}
					onClick={() => toggleScreenState()}
				/>
				{isUserInGroup && (
					<Button
						text="Leave group"
						onClick={() => {
							leaveGroup()
						}}
					/>
				)}
				{isUserInGroup === false && (
					<Button
						text="Join group"
						onClick={() => {
							joinGroup()
						}}
					/>
				)}
				{isUserGroupOwner && (
					<Button
						text="Delete group"
						onClick={() => {
							deleteGroup()
						}}
					/>
				)}

			</div>
			{screenState === GroupScreenStates.POSTS && <GroupPosts posts={group?.posts} />}
			{screenState === GroupScreenStates.LEADERBOARD && <Leaderboard posts={group?.posts} />}
		</div>
	)
}

const GroupPosts = (props) => {
	const { posts } = props

	const navigate = useNavigate();

	const onPostClick = (postId) => {
		console.log('Post clicked', postId)
		navigate('/post', { state: { postId: postId } })
	}

	return (
		<div
			className="animation-fade-right"
		>
			{posts && posts.map((post) => (
				<Post
					key={post._id}
					title={post.title}
					likes={post.likes}
					user={post.user}
					image={post.image}
					comments={post.comments}
					onClick={() => onPostClick(post._id)}
					timestamp={post.timestamp}
					preview
				/>
			))}
		</div>
	)
}



export default GroupScreen