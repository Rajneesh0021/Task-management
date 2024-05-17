import axios from 'axios';

const baseURL = 'http://localhost:9090/auth'; 

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/signup`, userData);
    // const { token } = response.data;
    // localStorage.setItem('token', token); 
    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log('Error registering user:', error);
    // throw error;
    return error
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userData);
    // const { token } = response.data;
    // localStorage.setItem('token', token);
    // console.log(response)
    return response.data;
  } catch (error) {
    // console.log('Error logging in:', error);
    return error
  }
};
