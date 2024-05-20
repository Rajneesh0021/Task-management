import axios from 'axios';

const baseURL = 'https://task-management-37bo.onrender.com/api/V0';


//
export const APICall = async (payload,token, endpoint,method) => {
  try {
    const response = await axios({
      method: method,
      url: `${baseURL}${endpoint}`,
      data:payload,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    } else {
      
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        success: false,
        message: 'No response from server',
      };
    } else {
      // Something happened in setting up the request that triggered an error
      return {
        success: false,
        message: 'Request error',
      };
    }
  }
};
