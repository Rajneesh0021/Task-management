import axios from 'axios';

const baseURL = 'http://localhost:9090/api/V0';

// Fetch all tasks
export const fetchTasks = async (token) => {
  try {
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
    
  } catch (error) {
    return error
  }
};
// create a task 
export const createTask = async (payload,token) => {
  try {
    const response = await axios.post(baseURL,payload,  {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
    
  } catch (error) {
    return error
  }
};
// Update a task
export const updateTask = async (taskId, updatedTask, token) => {
  try {
    const response = await axios.put(`${baseURL}/${taskId}`, updatedTask, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
   return error
  }
};

// Delete a task
export const deleteTask = async (taskId, token) => {
  try {
   
    const response = await axios.delete(`${baseURL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return error
  }
};


// Register a new user or login
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
      // Handle other status codes appropriately
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    // Check if the error response exists
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
