import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from "../../button";
import dataNinja from "../../../utilities/axios";
import AppContext from "../../../utilities/context";

const GroupListScreen = () => {

	const navigate = useNavigate();
	const { user } = useContext(AppContext);

	const [groups, setGroups] = useState([{}])

	const getGroups = () => {
		dataNinja.get('http://localhost:5000/group/get', {
			params:
				{ userId: user._id },
		})
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
					<GroupItem
						_id={group._id}
						name={group.name}
						image={group.image}	
					/>
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

const GroupItem = (props) => {
	const { _id, name, image } = props

	const navigate = useNavigate();


	return (
		<div
			className="item__container"
			onClick={() => {
				navigate('/group', { state: { groupId: _id } });
			}}
		>
			<img
				style={{
					height: '5rem',
					width: '5rem'
				}}
				src={image}
			/>
			<div
				className="item__name"
			>
				{name}
			</div>
		</div>
	)
}

export default GroupListScreen
export { GroupItem }