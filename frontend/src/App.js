import React, { useEffect, useState } from 'react'

import './App.css'
const App = () => {
  const [data ,setData] = useState([]);
  const getdata = async ()=>{
      const res = await fetch(`https://mern-api-ua94.onrender.com/api/users/allusers`);
      const users =  await res.json();
      setData(users);
      
    }
  useEffect(()=>{
    getdata();
  },[])
  console.log(process.env.BASE_URL);
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
