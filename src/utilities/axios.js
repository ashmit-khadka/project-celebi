// axios.js
import axios from 'axios';
import { useContext } from 'react';
import UserContext from './context';

// Create an instance of axios
const dataNinja = axios.create({
  baseURL: 'http://localhost:5000/'
});

// Add a request interceptor
dataNinja.interceptors.request.use((config) => {
  // Use useContext to get the user data
  // const { user } = useContext(UserContext);

  // if (user) {
  //   // Modify the config object, add user data to the request headers
  //   config.headers['User-Data'] = user;
  // }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default dataNinja;