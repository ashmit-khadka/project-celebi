import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/index.scss'
import Main from './components/main/index'
import reportWebVitals from './reportWebVitals';
import Home from './components/home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import MyChallenges from './components/screen/screenMyChallenges';
import Challange from './components/challenge';
import ChallengeScreen from './components/challenge';
import ScreenCreatePost from './components/screen/screenCreatePost/ScreenCreatePost';
import ScreenCreatePostSuccessful from './components/screen/screenCreatePost/screenCreatePostSuccessful';
import GroupListScreen from './components/screen/groupListScreen/GroupListScreen';
import GroupScreen from './components/screen/groupScreen';
import AppContext from './utilities/context';
import axios from 'axios';
import Header from './components/header';
import BottomNavigationBar from './components/BottomNavigationBar';
import Breadcrumb from './components/Breadcrumb';
import GroupFindScreen from './components/screen/GroupFindScreen';
import GroupCreateScreen from './components/screen/GroupCreateScreen';
import LoginScreen from './components/screen/LoginScreen';
import PostScreen from './components/screen/PostScreen';



const App = () => {
	const [user, setUser] = useState(null);
	const [pageMeta, setPageMeta] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:5000/getUserMock')
			.then((res) => {
				setUser(res.data);
			})
	}, []);

	return (
		<AppContext.Provider value={{ user, setUser, pageMeta, setPageMeta }}>
      <Router>
        <div 
          style={{
            background: 'linear-gradient(to bottom, #FFD597, #FFD1A7)', // Change this line
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }
        }>
          <Header />
          <div
            style={{
              padding: '0 1.5rem',
              overflowY: 'auto',
              flexGrow: 1,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new_challenge" element={<Main />} />
              <Route path="/my_challenges" element={<MyChallenges />} />
              <Route path="/challenge" element={<ChallengeScreen />} />
              <Route path="/challenge/create" element={<ScreenCreatePost />} />
              <Route path="/challenge/created" element={<ScreenCreatePostSuccessful />} />
              <Route path="/groups" element={<GroupListScreen />} />
              <Route path="/group" element={<GroupScreen />} />
              <Route path="/group/find" element={<GroupFindScreen />} />
              <Route path="/group/create" element={<GroupCreateScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/post" element={<PostScreen />} />

            </Routes>
          </div>
          <BottomNavigationBar />
        </div>
      </Router>
		</AppContext.Provider>
	)
}

export default App;