import React, { useEffect, useState, useContext } from "react";
import challenges from '../../AI/stubs/challenge.json'
import Steps from "../steps";
import Button from "../button";

import { AudioRecorder } from "react-audio-voice-recorder";
import VoiceRecorder from "../mic-recorder";
import { ClimbingBoxLoader } from "react-spinners";
//import challangeMe from "../../AI/AI.mjs";
import Confetti from 'react-confetti'
import { Link } from "react-router-dom";

import Image from "../../assets/images/home_avatar.png"
import ChallengeList from "../challengeList";
import Challange from "../Challenge";

import { useNavigate } from "react-router-dom";
import AppContext from "../../utilities/context";
import Textbox from "../controls/Textbox";
import dataNinja from "../../utilities/axios";

const steps = {
	STEP_A: 'STEP_A',
	STEP_B: 'STEP_B',
	STEP_C: 'STEP_C',
	STEP_LOADING: 'STEP_LOADING',
	STEP_CONFIRM: 'STEP_CONFIRM',
}



const Main = () => {


	const [screen, setScreen] = useState({
		screen: steps.STEP_A,
		data: {},
		progress: 1
	})
	const [challanges, setChallenges] = useState([])

	const updateScreen = (newScreen, data = {}) => {
		const newScreenObj = {
			screen: newScreen,
			data: data,
			progress: screen.progress
		}
		if (newScreen === steps.STEP_A) {
			newScreenObj.progress = 1;
		} else if (newScreen === steps.STEP_B) {
			newScreenObj.progress = 2;
		} else if (newScreen === steps.STEP_C) {
			newScreenObj.progress = 3;
		} else if (newScreen === steps.STEP_CONFIRM) {
			newScreenObj.progress = 4;
		}
		setScreen(newScreenObj)
	}

	return (
		<div
			className="modal"

			style={{
				background: 'linear-gradient(to bottom, #FFD597, #FFD1A7)', // Change this line
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Steps
				steps={4}
				currentStep={screen.progress}
			/>
			{screen.screen === steps.STEP_A && <STEP_A updateScreen={updateScreen} screenData={screen} />}
			{screen.screen === steps.STEP_B && <STEP_B updateScreen={updateScreen} screenData={screen} />}
			{screen.screen === steps.STEP_C && challanges && <STEP_C updateScreen={updateScreen} screenData={screen} challenges={challanges} />}
			{screen.screen === steps.STEP_CHALLANGE && <ChallangeScreen updateScreen={updateScreen} screenData={screen} />}
			{screen.screen === steps.STEP_LOADING && <LoadingScreen updateScreen={updateScreen} screenData={screen} setChallenges={setChallenges} />}
			{screen.screen === steps.STEP_CONFIRM && <Step_Confirm updateScreen={updateScreen} screenData={screen} />}

		</div>
	)
}


const STEP_A = (props) => {
	const { updateScreen } = props
	return (
		<div

			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyItems: 'center'
			}}
		>
			<h2
				className="screen__header"
			>
				What kind of challenge would you like?
			</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem'
				}}
			>
				<Button
					text={"Give me a custom challenge"}
					onClick={() => updateScreen(steps.STEP_B)}
				/>
				<Button
					text={"Suprise me"}
					onClick={() => updateScreen(steps.STEP_C)}
				/>
				<Link
					to={"/"}
				>
				</Link>

			</div>
		</div>
	)
}



const STEP_B = (props) => {
	const { updateScreen } = props

	const [text, setText] = useState('going on holdiday to thailand for a week');

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const challenge = () => {
		updateScreen(steps.STEP_LOADING, { prompt: text })
	}

	return (
		<div
			className="animation-fade-right"
			style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}
		>
			<h2
				className="screen__header"
			>
				Tell me about your day
			</h2>
			<div
				style={{
					height: '100%'
				}}
			>
				<Textbox
					text={text}
					onChange={handleChange}
				/>
				<div
					style={{
						display: 'flex',
						gap: '1rem',
						flexDirection: 'column',
						paddingTop: '1rem',
					}}
				>
					<Button
						text="Challenge Me!"
						onClick={() => challenge()}
					/>
					<Button
						text="Back"
						onClick={() => updateScreen(steps.STEP_A)}
					/>
				</div>
			</div>
		</div>
	)
}


const STEP_C = (props) => {
	const { updateScreen, challenges } = props

	const onChallangeClick = (challange) => {
		updateScreen(steps.STEP_CHALLANGE, {
			...challange,
		})
	}

	return (
		<div
			className="animation-fade-right"
		>
			<h2
				className="screen__header"
			>
				Here's some challanges
			</h2>

			<ChallengeList
				challenges={challenges}
				onClick={onChallangeClick}
			/>
			<Button
				text="Generate more"
				onClick={() => { }}
				style={{
					marginTop: '1rem'
				}}
			/>

		</div>

	)
}


const ChallangeScreen = (props) => {
	const { updateScreen, screenData } = props
	const { data } = screenData
	const { user, notify } = useContext(AppContext)

	console.log(data)

	const onAcceptChallenge = async () => {

		const response = await dataNinja.post('/challenge/create', { 
			title: data.title,
			description: data.description,
			image: data.image,
			points: data.points,
			user: user._id,
			impact: data.impact,
		})

		notify('Challenge accepted!')
		updateScreen(steps.STEP_CONFIRM, response.data)

	}



	return (
		<div
			className="animation-fade-right"
		>
			<div>
				<Challange
					challenge={data}
				/>
			</div>


			<Button
				text="How does this help?"
				onClick={() => {
					notify('Challenge accepted!')
					updateScreen(steps.STEP_CONFIRM)
				}}
				style={{
					marginTop: '1rem'
				}}
			/>

			<Button
				text="Accept"
				onClick={onAcceptChallenge}
				style={{
					marginTop: '1rem'
				}}
			/>



			<Button
				text="Back"
				onClick={() => updateScreen(steps.STEP_C)}
				style={{
					margin: '1rem 0 1rem'
				}}
			/>


		</div>
	)
}

const LoadingScreen = (props) => {
	const { updateScreen, screenData, setChallenges } = props
	console.log('screenData', screenData)


	const getChallanges = async () => {
		const response = await dataNinja.post('/ai/challenge', { prompt: screenData.prompt })
		updateScreen(steps.STEP_C);
		setChallenges(response.data)
	}

	const getChallangesMock = async () => {
		setTimeout(() => {
			updateScreen(steps.STEP_C);
			setChallenges(challenges)
		}, 1000);
	}

	useEffect(() => {
		//getChallanges()
		getChallangesMock()
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h2
				className="screen__header"
			>
				Thinking of some challanges for you..
			</h2>
			<div
				className="animation-fade-up"
				style={{
					display: 'flex',
					justifyContent: 'center',
					height: '100%',
					flex: 1,

				}}
			>
				<ClimbingBoxLoader color="#610000" />

			</div>


		</div>
	)
}

const Step_Confirm = (props) => {
	const { screenData } = props
	const { data } = screenData

	const navigate = useNavigate()

		console.log('screenData', screenData)

	return (
		<div>
			<Confetti
				numberOfPieces={100}
				gravity={0.1}
			/>

			<h2
				className="screen__header"
			>
				Challenge accepted!
			</h2>
			<div>
				<img
					style={{
						height: '20rem',
					}}
					src="https://celebi-kcl.s3.eu-north-1.amazonaws.com/gifs/accept_challenge.gif"
				/>
			</div>
			<div>
					{data?.impact}
			</div>

			<Button
				text="Go home"
				onClick={() => {

					navigate('/')
				}}
				style={{
					marginTop: '1rem'

				}}
			/>
		</div>
	)
}

export default Main