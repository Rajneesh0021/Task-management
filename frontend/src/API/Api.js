import axios from 'axios';

const baseURL = 'http://localhost:9090/tasks';

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
