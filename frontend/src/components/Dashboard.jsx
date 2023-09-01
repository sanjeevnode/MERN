import React, { useContext, useEffect, useState } from 'react'
import { USERDATA } from '../App';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify'
import { FaUserEdit } from 'react-icons/fa'

const Dashboard = () => {
  const { currentToken, setCurrentUser, currentUser } = useContext(USERDATA);

  const { register, handleSubmit } = useForm();
  const [showpassword, setShowPassword] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);

  const updateUser = async (data) => {
    const res = await fetch(`http://localhost:5000/api/users/profile`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
      }
    });
    return res;
  }

  const formSubmit = async (data, e) => {
    if(data.password===data.confirmpassword){
      const res = await updateUser(data);
      const user = await res.json();
      setCurrentUser(user);
      toast.success("Update Successfull", {
        autoClose: 2000
      });
      e.target.reset();
      setInputDisabled(true);
    }
   else{
    toast.error("Invalid form data",{
      autoClose:3000
    });
   }
  }

  useEffect(() => {
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
    if (currentToken !== "") {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentToken])
  return (
    <div className='w-full h-screen'>

      <div className='max-w-[900px] mx-auto px-4 flex flex-col justify-center  h-full items-center'>

        <form onSubmit={handleSubmit(formSubmit)} action="" className='flex flex-col justify-center  py-4 px-6 border border-gray-400 w-[70%]'>
          <div className='flex justify-between items-center'>
            <p className='text-2xl font-medium text-pink-700 '>
              Profile
            </p>
            <div onClick={()=>setInputDisabled(false)} className='flex justify-center items-center gap-1 cursor-pointer rounded-md border hover:bg-[#f1f1f1] px-2 py-1' >
              <FaUserEdit />
              <p>Edit</p>
            </div>
          </div>
          <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type="text" name="" id="" placeholder='name' {...register('name')} disabled={inputDisabled} defaultValue={currentUser.name} />
          <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type="text" name="" id="" placeholder='email' {...register('email')} disabled={inputDisabled} defaultValue={currentUser.email} />
          <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type={showpassword ? "text" : "password"} name="" id="" placeholder='password' {...register('password')} />
          <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type={showpassword ? "text" : "password"} name="" id="" placeholder='confirm password' {...register('confirmpassword')} />
          <div className='flex gap-2 p-2 w-fit ' >
            <input className='cursor-pointer' type="checkbox" checked={showpassword} onChange={() => setShowPassword(!showpassword)} />
            <p>show password</p>
          </div>
          <button className='border my-4 p-2 outline-none bg-pink-500 hover:bg-pink-400 text-white rounded-sm ' type='submit'>Update</button>
        </form>
      </div>

    </div>
  )
}

export default Dashboard
