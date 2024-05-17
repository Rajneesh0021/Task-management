import './App.css';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import CreateTaskPage from './Pages/CreateTaskPage';
import DashboardPage from './Pages/DashboardPage';
import {Routes, Route} from 'react-router-dom'
function App() {
  return (

    <Routes>
      <Route path='/' element={<DashboardPage/>}/>
      <Route path='/create-Task' element={<CreateTaskPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
