import React, { useEffect, useContext, useState } from 'react';
import IconMenu from '../../assets/icons/menu.svg'
import IconBack from '../../assets/icons/back.svg'
import IconNotification from '../../assets/icons/bell.svg'
import AppContext from '../../utilities/context';
import { useNavigate, useLocation } from "react-router-dom"; // Import useHistory
import Button from '../button';
import Notification from '../Notification';

const Header = () => {
	const { user } = useContext(AppContext);
	const navigate = useNavigate(); // Get the history object

	const location = useLocation(); // Get the location object
	const [showBack, setShowBack] = useState(false)

	const [showOverlay, setShowOverlay] = useState(false);
	const [data, setData] = useState(null);


	const handleBackClick = () => {
		navigate(-1) // Go back in history
	};

	const handleImageClick = () => {
		setShowOverlay(true);
	};

	const handleOverlayClick = () => {
		setShowOverlay(false);
	};



	useEffect(() => {

		if (location.pathname === '/') {
			setShowBack(false)
		}
		else {
			setShowBack(true)
		}
	}, [location]);



  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/notifications?userId=${user?._id}`);

    ws.onmessage = (event) => {
      const change = JSON.parse(event.data);
			console.log(change)
      setData(change);
    };

    return () => {
      ws.close();
    };

  }, [user]);

	if (location.pathname === '/login') {
		return null
	}


	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '1rem 1.5rem',
			}}
		>
			<div>
				{showBack && (
					<img
						style={{
							width: '2rem',
							height: '2rem',
							marginRight: '1rem'
						}}
						onClick={handleBackClick} // Add an onClick handler
						src={IconBack} alt="menu" />
				)}


			</div>
			<h1>Project Celebi</h1>

			<img
				style={{
					width: '3rem',
					height: '3rem',
					borderRadius: '50%',
					zIndex: 100

				}}
				src={user?.image} alt="menu"
				onClick={handleImageClick}

			/>

			{showOverlay && (
				<div
					className='circle'
					onClick={handleOverlayClick}
					style={{
						position: 'fixed',
						top: 0,
						right: 0,
						width: '100%',
						height: '100%',
						background: 'linear-gradient(to bottom, #FFD597, #FFD1A7)', // Change this line
						zIndex: 10,
						padding: '1.5rem',
						
					}}
				>
					{/* Your overlay menu here */}
					<div
						className='animation-fade-right-delayed'
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',

							}}
						>
							<Notification />
							<Notification />
							<Notification />

						</div>
						<Button
							text="Logout"
						/>
					</div>
				</div>
			)}

		</div>
	)
}

export default Header