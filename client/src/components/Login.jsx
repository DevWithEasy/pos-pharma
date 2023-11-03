import axios from 'axios';
import React, { useState } from 'react';
import handleChange from '../utils/handleChange';
import api_url from '../utils/api_url';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import toast_alert from '../utils/toast_alert';
import bg from '../assets/sign-up-form.svg'

const Login = () => {
    const {addUser} = useUserStore()
    const navigate= useNavigate()
    const toast = useToast()
    const [loading,setLoading] = useState(false)

    const [value,setValue] = useState({
        email : '',
        password : ''
    })

    const signin=async(e)=>{
        e.preventDefault()
        if(!value.email || !value.password){
            return toast_alert(
                toast,
                'Please insert email or password',
                'error'
            )
        }
        setLoading(true)
        try {
            const res = await axios.post(`${api_url}/api/auth/signin`,value)

            if(res.data.status=== 200){
                toast_alert(
                    toast,
                    res.data.message
                )
                localStorage.setItem('token',res.data.token)

                addUser(res.data.data)
                
                navigate('/')
                setLoading(false)
            }
            
        } catch (error) {
            setLoading(false)
            return toast_alert(
                toast,
                error.response.data.message,
                'error'
            )
        }
    }

    return (
        <div
            className='w-full grid grid-cols-2'
        >
            <div className='w-full flex flex-col justify-center items-center space-y-2 text-white p-4'>
                <h1
                    className='text-4xl font-bold uppercase'
                >
                    Welcome
                </h1>
                <p
                    className='font-bold text-xl'
                >
                    Best Point of sales (POS) solutions of Pharmacy.
                </p>
                <p
                    className='text-xs'
                >
                    DevWithEasy Solution Ltd.
                </p>
            </div>
            <div className='w-full flex justify-center items-center bg-white/60'>
                
                <form
                    onSubmit={(e)=>signin(e)}
                    className='w-8/12 space-y-2'
                >
                    <input 
                        type='text' 
                        name='email'
                        onChange={(e)=>handleChange(e,value,setValue)}
                        placeholder='Enter email or phone number' 
                        className='w-full p-2 rounded-md focus:outline-none placeholder:text-gray-300 shadow'
                    />
                    <input 
                        type='text' 
                        name='password'
                        onChange={(e)=>handleChange(e,value,setValue)}
                        placeholder='Enter password' 
                        className='w-full p-2 rounded-md focus:outline-none placeholder:text-gray-300 shadow'
                    />
                    <button
                        className='w-full p-2 text-center bg-blue-700 text-white rounded-lg shadow'
                    >
                        {
                            loading ? 'Please wait...' : 'Signin'
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;