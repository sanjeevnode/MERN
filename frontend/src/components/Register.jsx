import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading'


const Register = () => {
    const [showpassword, setShowPassword] = useState(false);
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(true);

    const registerUser = async (data) => {
        setIsLoading(false);
        const res = await fetch(`https://mern-auth-q5jz.onrender.com/api/users/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return res;
    }

    const formSubmit = async (data, e) => {
        if (data.password === data.confirmpassword) {
            const res = await registerUser({
                name: data.name,
                email: data.email,
                password: data.password
            });
            const d = await res.json()
            if (res.ok) {
                setIsLoading(true);
                e.target.reset();
                toast.success("User Created Successfully", {
                    autoClose: 3000
                })
            } else {
                setIsLoading(true);
                toast.error(d, {
                    autoClose: 3000
                })
            }
        } else {
            setIsLoading(true);
                toast.error("Wrong credentials", {
                    autoClose: 3000
                })
        }
    }
    return (
        <div className='w-full h-screen'>

            <div className='max-w-[900px] mx-auto px-4 flex flex-col justify-center  h-full items-center'>

                <div hidden={isLoading} className='absolute z-10'>
                    <ReactLoading type='spinningBubbles' color='pink' height={150} width={150} />

                </div>

                <form onSubmit={handleSubmit(formSubmit)} action="" className='flex flex-col justify-center  py-4 px-6 border border-gray-400 w-[70%]'>
                    <div>
                        <p className='text-2xl font-medium text-pink-700 '>
                            Register
                        </p>
                    </div>
                    <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type="text" name="" id="" placeholder='name' {...register('name', { required: true })} />
                    <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type="text" name="" id="" placeholder='email' {...register('email', { required: true })} />
                    <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type={showpassword ? "text" : "password"} name="" id="" placeholder='password' {...register('password', { required: true })} />
                    <input className='border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm' type={showpassword ? "text" : "password"} name="" id="" placeholder='confirm password' {...register('confirmpassword', { required: true })} />
                    <div className='flex gap-2 p-2 w-fit ' >
                        <input className='cursor-pointer' type="checkbox" checked={showpassword} onChange={() => setShowPassword(!showpassword)} />
                        <p>show password</p>
                    </div>
                    <button className='border my-4 p-2 outline-none bg-pink-500 text-white rounded-sm' type='submit'>Register</button>
                </form>
            </div>

        </div>
    )
}

export default Register
