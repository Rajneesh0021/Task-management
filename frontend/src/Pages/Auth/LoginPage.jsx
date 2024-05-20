import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth } from '../../API/Auth'; 
import swal from 'sweetalert'
import { useNavigate,Link } from 'react-router-dom';
const LoginPage = () => {
  const navigation=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const data = await Auth(userData,'/login');
      console.log('Login Successful:',data.data.data.message);
      

    if(data.success){
   await localStorage.setItem('token', data.data.data.token);
   await swal({
      title: "Message",
      text: data.data.message,
      icon: "success",
    });
   navigation('/')
    }else{

      swal({
        title: "Message",
        text: data.data.message,
        icon: "warning",
      });
    }
    } catch (error) {
      console.log('Login Error:', error);
      swal({
        title: "Message",
        text: error.message,
        icon: "error",
      });
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Email</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              <p>Don't have account ? <Link to='/register'>Register</Link></p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
