import React, { useState, useEffect } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchTasks,deleteTask,updateTask } from '../API/Api';

const DashboardPage = () => {
  const token =localStorage.getItem('token')
  const navigate=useNavigate()
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);


  useEffect(() => {
    if(!token){
      navigate('/login')
    }
    const fetchData = async () => {
      try {
        const data = await fetchTasks(token);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchData();
  }, [token]); 

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId,token); 
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
  };
  const handleUpdateTask = async (taskId, updatedTaskData) => {
    try {
      await updateTask(taskId, updatedTaskData, token);
      // Assuming your API returns the updated task data, you can update the state accordingly
      const updatedTasks = tasks.map(task => {
        if (task._id === taskId) {
          return { ...task, ...updatedTaskData };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const handleUpdateStatus = async(taskId) => {
    try{
      const updatedTaskData = {
        status:"Completed"
      };
      await handleUpdateTask(taskId, updatedTaskData);
      console.log('Updating Status for Task with ID:', taskId);
    }catch(error){
      console.log('Error updating task:', error);
    }
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTaskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('dueDate').value
      };
      await handleUpdateTask(editedTask._id, updatedTaskData);
      setEditedTask(null);
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="table-responsive">
        <Link to='/create-Task'>Create New Task</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Due Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} className={task.status === 'completed' ? 'table-success' : ''}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>
                  <button className="btn btn-danger btn-sm m-2" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                  <button className="btn btn-primary btn-sm mx-2 m-2" onClick={() => handleEditTask(task)}>Edit</button>
                  {task.status === 'Pending' && (
                    <button className="btn btn-success btn-sm m-2" onClick={() => handleUpdateStatus(task._id)}>Complete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Task Modal */}
      {editedTask && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button type="button" className="close" aria-label="Close" onClick={() => setEditedTask(null)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" defaultValue={editedTask.title} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" defaultValue={editedTask.description}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input type="date" className="form-control" id="dueDate" defaultValue={editedTask.dueDate} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
