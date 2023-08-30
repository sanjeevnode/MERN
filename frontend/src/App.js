import React, { useEffect, useState } from 'react'
import './App.css'
const App = () => {
  const [data ,setData] = useState([]);
  const getdata = async ()=>{
      const res = await fetch(`http://localhost:5000/api/users/allusers`);
      const users =  await res.json();
      setData(users);
    }
  useEffect(()=>{
    getdata();
  },[])
  return (
    <div className='App'>

      {
        data.map((e,i)=>{
          return(
            <div key={i} className="card">
              <p> {e._id}</p>
              <p>{e.name}</p>
              <p>{e.email} </p>
            </div>
          )
        })
      }
      
    </div>
  )
}

export default App
