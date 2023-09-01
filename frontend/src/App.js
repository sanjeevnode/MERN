import Header from './components/Header'
import './index.css'
import Login from './components/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { createContext, useEffect, useState } from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const USERDATA = createContext();

const App = () => {

  const [currentToken, setCurrentToken] = useState(
    localStorage.getItem('jwtToken') || ""
  );

  const [currentUser, setCurrentUser] = useState({});

  const getUser = async () => {
    const res = await fetch(`http://localhost:5000/api/users/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    setCurrentUser(data);
  }

  useEffect(() => {
    if (currentToken!=="") {
      getUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentToken])

  return (
    <USERDATA.Provider value={{ currentToken, setCurrentToken, currentUser, setCurrentUser }}>
      <div>
        <Header />
        <ToastContainer/>
        <Routes>
          <Route path='/' element={currentToken ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </USERDATA.Provider>
  )
}

export { USERDATA }
export default App
