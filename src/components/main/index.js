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
import Challange from "../challenge/challenge";

import { useNavigate } from "react-router-dom";
import AppContext from "../../utilities/context";
import Textbox from "../controls/Textbox";

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

	console.log(screen)

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
			{screen.screen === steps.STEP_C && <STEP_C updateScreen={updateScreen} screenData={screen} challenges={challanges} />}
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

	const [text, setText] = useState('');

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const addAudioElement = (blob: Blob) => {
		const url = URL.createObjectURL(blob);
		const audio = document.createElement('audio');
		audio.src = url;
		audio.controls = true;
		document.body.appendChild(audio);
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

			{/* <AudioRecorder
                classes={{
                    AudioRecorderClass : 'test',                        
                }}
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
                // autoGainControl,
                // channelCount,
                // deviceId,
                // groupId,
                // sampleRate,
                // sampleSize,
                }}
                onNotAllowedOrFound={(err) => console.table(err)}
                downloadOnSavePress={true}
                downloadFileExtension="mp3"
                mediaRecorderOptions={{
                audioBitsPerSecond: 128000,
                }}
                // showVisualizer={true}
            /> */}
			{/* <VoiceRecorder /> */}
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
	const { updateScreen, screenData, challenges } = props
	const { setPageMeta } = useContext(AppContext)

	const onChallangeClick = (challange) => {
		updateScreen(steps.STEP_CHALLANGE, {
			title: challange.title,
			description: challange.description,
			image: challange.image
		})
	}

	useEffect(() => {
		setPageMeta({
			title: 'Select a challenge'
		})
	}, [])

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

			{/* onClick={() => updateScreen(steps.STEP_CHALLANGE, { 
                        title: c.title,
                        description: c.description,
                        image: c.image
                     })} */}

			<Button 
				text="Generate more"
				onClick={() => {}}
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

	console.log(data)
	return (
		<div
			className="animation-fade-right"
		>
			<Button
				text="Back"
				onClick={() => updateScreen(steps.STEP_C)}
				style={{
					margin: '2rem 0 1rem'
				}}
			/>
			<div>

				<Challange
					challenge={data}
				/>
			</div>

			<Button
				text="Accept"
				onClick={() => updateScreen(steps.STEP_CONFIRM)}
				style={{
					marginTop: '1rem'
				}}
			/>


		</div>
	)
}

const LoadingScreen = (props) => {
	const { updateScreen, screenData, setChallenges } = props
	console.log('screenData', screenData)

	// const getChallanges = async () => {
	//     const newChallenges = await challangeMe(screenData.data.prompt)
	//     updateScreen(steps.STEP_C);
	//     setChallenges(newChallenges)
	// }

	const getChallangesMock = async () => {
		setTimeout(() => {
			updateScreen(steps.STEP_C);
			setChallenges(challenges)
		}, 2000);
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
				className="animation-fade-right"
				style={{
					fontFamily: 'Libre Baskerville',
					color: '#610000',
					fontSize: '2.5rem',
					padding: '3rem 0 2rem'
				}}
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

const Step_Confirm = () => {
	const navigate = useNavigate()


	return (
		<div>
			<Confetti
				numberOfPieces={100}
				gravity={0.1}
			/>
			<h2
				style={{
					fontFamily: 'Libre Baskerville',
					color: '#610000',
					fontSize: '2.5rem',
					padding: '3rem 0 2rem'

				}}
			>
				Challenge accepted!
			</h2>
			<div>
				<img
					src="C:/Users/ashmi/Downloads/giphy.gif"
				/>
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

const Home = () => {
	return (
		<div>

		</div>
	)
}

export default Main