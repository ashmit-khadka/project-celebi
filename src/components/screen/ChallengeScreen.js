import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import Button from "../button";

import axios from "axios";

import Challenge from "../Challenge";

import dataNinja from "../../utilities/axios";
import AppContext from "../../utilities/context";

const ChallangeScreen = (props) => {

	const navigate = useNavigate();
	const location = useLocation();
	const { setGuide } = useContext(AppContext);
	const challengeId = location.state?.challengeId;

	const [challenge, setChallenges] = useState({})

	console.log(location.state)

	const getChallange = () => {
		dataNinja.get(`/challenge/list?id=${challengeId}`)
			.then((res) => {
				console.log(res)
				setChallenges(res.data)
			})
	}

	const deleteChallenge = () => {
		dataNinja.get('/challenge/delete', {
			params: {
				id: challengeId
			}
		})
			.then((res) => {
				console.log(res)
				navigate('/my_challenges')
			})
	
	}

	useEffect(() => {
		getChallange()
	}, [])

	return (
		<div
		>
			<Challenge challenge={challenge} />
			<div
				style={{
					marginTop: "1rem",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
				}}
			>

				<Button
					text="Help me"
					onClick={() => {
						console.log("Start Challenge")
						setGuide({ prompt: challenge.title})
					}}
				/>

				<Button
					text="Complete"
					onClick={() => {
						console.log("Start Challenge")
						navigate("/challenge/create", { state: { challenge: challenge } })

					}}
				/>

				<Button
					text="End Challenge"
					onClick={() => {
						deleteChallenge()
					}}
				/>
			</div>
		</div>
	)
}

export default ChallangeScreen