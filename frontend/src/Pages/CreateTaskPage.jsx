import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { createTask } from '../API/Api';
const CreateTaskPage = ({ onAddTask }) => {
  const token =localStorage.getItem('token')
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      dueDate
    };
  
    try {
    const response=  await createTask(newTask,token); 
      console.log(response)
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    console.log(newTask)
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create New Task</h2>
      <Link to='/'>Check Your Tasks</Link>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            id="dueDate"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
