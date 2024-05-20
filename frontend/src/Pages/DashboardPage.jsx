import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import {  deleteTask, updateTask, APICall } from '../API/Api';
import Navbar from '../Components/Navbar';

const DashboardPage = () => {
  const navigate=useNavigate()
  const token = localStorage.getItem('token');
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    if(!token || token===undefined){
     navigate('/login')
    }else{
      const fetchData = async () => {
        try {
          const data = await APICall('', token, '/','get');
          console.log('data',data)
          if(data.success){
            setTasks(data.data.data);
          }else{
            swal({
              title: "Message",
              text: data.message,
              icon: "warning",
            });
          }
         
        
        } catch (error) {
          console.log('Error fetching tasks:', error);
        }
      };
  
      fetchData();
    }
   
  }, [token,navigate]);

  const handleDeleteTask = async (taskId) => {
    try {
        
    const data=  await APICall('',token, `/${taskId}`,'delete');
    if(data.success){
      await  swal({
        title: "Message",
        text: data.data.message,
        icon: "success",
      });
      window.location.reload();
     }else{
      await  swal({
        title: "Message",
        text: data.message,
        icon: "warning",
      });
     }
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditedTask(task);
  };

  const handleUpdateStatus = async (taskId) => {
    try {
   
      const updatedTask = { ...tasks.find(task => task._id === taskId), status: 'Completed' };
     const data= await APICall(updatedTask,token,`/${taskId}`,'put');
      console.log(data)
      if(data.success){
        await swal({
          title: "Message",
          text: data.data.message,
          icon: "success",
        });
        window.location.reload();
      }else{
        await swal({
          title: "Message",
          text: data.message,
          icon: "warning",
        });
      }
     
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // payload,token, endpoint,method
     const data= await APICall(editedTask,token,`/${editedTask._id}`,'put');
      console.log(data)
      if(data.success){
       await swal({
          title: "Message",
          text: data.data.message,
          icon: "success",
        });
        window.location.reload();
      }
      setEditedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
        <Navbar link={'/create-Task'} text={'Add Task'}/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">YOUR TASKS</h2>

      {tasks.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
        <h1>  No tasks found !  </h1>
          <Link className=" text-center"  to='/create-Task'>Add Task</Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className='text-center'>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Due Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id} className={task.status === 'Completed' ? 'table-success' : ''}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td >{task.status}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button className="btn btn-danger btn-sm m-2" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                      <button className="btn btn-primary btn-sm m-2" onClick={() => handleEditTask(task)}>Edit</button>
                      {task.status === 'Pending' && (
                        <button className="btn btn-success btn-sm m-2" onClick={() => handleUpdateStatus(task._id)}>Complete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={editedTask.title}
                      onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={editedTask.description}
                      onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dueDate"
                      value={editedTask.dueDate}
                      onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default DashboardPage;
