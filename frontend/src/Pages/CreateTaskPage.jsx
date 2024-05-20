import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { APICall, createTask } from '../API/Api';
import swal from 'sweetalert'


const CreateTaskPage = () => {
  const token =localStorage.getItem('token')
  const navigate =useNavigate()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  useEffect(() => {
    if(!token || token===undefined){
     navigate('/login')
    }
   
  }, [token,navigate]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      dueDate
    };
  
    try {
       // payload,token, endpoint,method
    const response=  await APICall(newTask,token,'/','post'); 
    if(response.success){
      swal({
        title: "Message",
        text: response.data.message,
        icon: "success",
      });
      setTitle('')
      setDescription('')
      setDueDate('')
    }
      console.log(response)
    } catch (error) {
      console.log('Error deleting task:', error);
    }
    console.log(newTask)
  };

  return (
    <>
     <Navbar link={'/'} text={'Tasks'}/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create New Task</h2>
      
      <form className=' p-4' onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary btn-sm mx-2 m-2 w-100">Create Task</button>
      </form>
    </div>
    </>
  );
};

export default CreateTaskPage;
