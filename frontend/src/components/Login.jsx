import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate} from 'react-router-dom'
import { USERDATA } from '../App';
import {toast} from 'react-toastify'


const Login = () => {
    const navigate = useNavigate();
    const [showpassword, setShowPassword] = useState(false)
    const { register, handleSubmit } = useForm();

    const loginUser = async (data) => {
        const res = await fetch(`http://localhost:5000/api/users/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res;
    }

    const {setCurrentToken} = useContext(USERDATA);

    const formSubmit = async (data, e) => {
         await loginUser({
            email: data.email,
            password: data.password
        }).then(async(res) => {
            if(res.ok){
                const {token} = await res.json();
                localStorage.setItem('jwtToken', token);
                setCurrentToken(token);
                e.target.reset();
                navigate('/',{ replace: true });
            }
            else{
                const error = await res.json();
                toast.error(error.message,{
                    autoClose:2000
                });
            }
        });
        
    }
    return (
        <div className='w-full h-screen'>

            <div className='max-w-[900px] mx-auto px-4 flex flex-col justify-center  h-full items-center'>

                <form onSubmit={handleSubmit(formSubmit)} action="" className='flex flex-col justify-center py-4 px-6 border border-gray-400 w-[70%]'>
                    <div>
                        <p className='text-2xl font-medium text-pink-700 '>
                            Login
                        </p>
                    </div>
                    <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type="text" name="" id="" placeholder='email'  {...register('email', { required: true })} />
                    <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type={showpassword ? "text" : "password"} name="" id="" placeholder='password'  {...register('password', { required: true })} />
                    <div className='flex gap-2 p-2 w-fit ' >
                        <input className='cursor-pointer' type="checkbox" checked={showpassword} onChange={() => setShowPassword(!showpassword)} />
                        <p>show password</p>
                    </div>
                    <button className='border my-4 p-2 outline-none bg-pink-500 text-white rounded-sm' type='submit'>Login</button>
                </form>
            </div>

        </div>
    )
}

export default Login
