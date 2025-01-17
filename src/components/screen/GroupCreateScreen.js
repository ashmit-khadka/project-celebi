/**
 * @name ScreenCreatePost
 * @description Create a new post
 */



import React, { useRef, useState, useContext, useEffect } from "react";
import Button from "../button";
import { useLocation, useNavigate } from 'react-router-dom';
import dataNinja from "../../utilities/axios";
import Post from "../Post";
import UserContext from "../../utilities/context";
import ImagePlaceholder from "../../assets/images/image_placeholder.jpeg";
import AppContext from "../../utilities/context";

const GroupCreateScreen = () => {

	const location = useLocation();
	const navigate = useNavigate();
	const challenge = location.state?.challenge;

	const { notify } = useContext(AppContext);

  const { user, setUser } = useContext(UserContext);

	const [name, setName] = React.useState("My Group")
	const [description, setDescription] = React.useState("In this group we will be doing amazing things together")
	const [interval, setInterval] = React.useState(7)

  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();

	const handleNameChange = (e) => {
		setName(e.target.value)
	}

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value)
	}

  const handleIntervalChange = (e) => {
    setInterval(e.target.value)
  
  }

	const [image, setImage] = useState(null);


	const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append('file', image);
		formData.append('name', name);
		formData.append('description', description);
		formData.append('interval', interval);

		try {
			const response = await dataNinja.post('/group/create', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				params: {
					userId: user._id
				}
			});
			console.log(response.data);
			navigate('/groups')
			notify('Created group!')
			//navigate("/challenge/created", { state: { challenge: challenge } })

		} catch (err) {
			console.error(err);
		}
	};

	const handleButtonClick = () => {
    fileInputRef.current.click();
  };

	const sectionHeader = ({ step, title, description, first }) => (
		<div
			style={{
				display: 'flex',
				gap: '1rem',
				margin: `${first ? '2rem' : '5rem' } 0 2rem`,
				paddingLeft: '.5rem',
			}}
		>
			<div
				style={{
					height: 'fit-content',
					backgroundColor: 'black',
					color: 'white',
					padding: '1rem',
					fontFamily: 'Inconsolata',
					fontSize: '1.5rem',
					fontWeight: '500',
					display: 'inline-block',
					boxShadow: '-0.5rem 0.5rem 0px 0px #DC7A7A',
				}}
			>
				{step}
			</div>
			<div>
				<div
					style={{
						fontSize: '1.5rem',
						fontWeight: 'bold',
					}}
				>{title}</div>
				<div>{description}</div>
			</div>
		</div>
	)

	return (
		<div
			className="animation-fade-right"
		>
			<div
				className="screen__header"
			>
				Create a group
			</div>
			{sectionHeader({
				step: 1,
				title: 'Name',
				description: 'Introduce your post with a title that showcases the impact of your actions',
				first: true,
			})}


			<textarea
				style={{
					backgroundColor: 'black',
					color: 'white',
					fontFamily: 'Inconsolata',
					fontSize: '1.2rem',
					//fontWeight: '300',
					height: '5rem',
					width: '100%',
					padding: '.5rem'

				}}
				value={name}
				onChange={handleNameChange}
			></textarea>


			{sectionHeader({
				step: 2,
				title: 'Image',
				description: 'Upload images from your challenge and celebrate your progress with the community'
			})}


			
			{preview && (
        <img src={preview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
      )}


			<input
        type="file"
        onChange={handleImageChange}
        style={{ display: 'none' }} // Hide the input
        ref={fileInputRef}
      />

			{!preview && (
				<Button
					text="Add photo"
					onClick={() => {handleButtonClick()}}
				/>
			)}


			{sectionHeader({
				step: 3,
				title: 'Your story',
				description: 'Tell us your personal story: the motivations, the efforts, and the satisfaction of completing the challenge'
			})}


			<textarea
				style={{
					backgroundColor: 'black',
					color: 'white',
					fontFamily: 'Inconsolata',
					fontSize: '1.2rem',
					//fontWeight: '300',
					height: '5rem',
					width: '100%',
					padding: '.5rem',

				}}
				value={description}
				onChange={handleDescriptionChange}
			></textarea>

			{sectionHeader({
				step: 4,
				title: 'Refresh leaderboard',
				description: 'Take a moment to preview your post; make sure it reflects your journey'
			})}


			<Button
				text="Create"
				onClick={() => {
					console.log("Submit Post")
					handleSubmit()
					//navigate("/challenge/created", { state: { challenge: challenge } })

				}}
			/>
		</div>
	)
}

export default GroupCreateScreen