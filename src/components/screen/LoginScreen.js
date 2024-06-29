import React, { useState, useContext, useEffect } from 'react';
import dataNinja from '../../utilities/axios';
import AppContext from '../../utilities/context';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import Textbox from '../controls/Textbox';

function LoginScreen() {

  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setemail] = useState('ashmit.khadka@mail.com');
  const [password, setPassword] = useState('1234');

  const handleSubmit = (event) => {

    login(email, password);
  };


  async function login(email, password) {
    try {
      const response = await dataNinja.post('/user/login', { email, password });
      console.log(response)
      const token = response.data.token;
      setUser({ ...response.data.user, token: response.data.token })


      // You are now logged in and your token is stored in local storage
    } catch (error) {
      console.error('Error logging in', error);
      // Handle login error
    }
  }

  useEffect(() => {
    if (user) {
      // Redirect to home page if user is already logged in
      navigate('/');
    }
  }, [user]);

  return (
    <div>
      <h2>Login</h2>
        <div>
          Email

        </div>
          <Textbox
            text={email}
            handleTextChange={(e) => setemail(e.target.value)}
          />


        <div>

        </div>
        <div>
          Password
        </div>
        <Textbox
            text={password}
            handleTextChange={(e) => setPassword(e.target.value)}
          />


        <Button
          text="Login"
          onClick={handleSubmit}
        />

        <Button
          text="Sign up"
          onClick={() => navigate('/signup')}
        />
    </div>
  );
}

export default LoginScreen;