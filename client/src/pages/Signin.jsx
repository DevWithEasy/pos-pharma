import axios from 'axios';
import React, { useState } from 'react';
import handleChange from '../utils/handleChange';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import toast_alert from '../utils/toast_alert';
import { useToast } from '@chakra-ui/react';
import api_url from '../utils/api_url';

const Signin = () => {
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
        <form 
            onSubmit={(e)=>signin(e)}
            className='w-1/2 mt-5 mx-auto space-y-2'
        >
            <h1 className='text-center text-xl'>Signin account</h1>
            <input 
                type='text' 
                name='email'
                onChange={(e)=>handleChange(e,value,setValue)}
                placeholder='Enter email or phone number' 
                className='w-full p-2 rounded-md border border-gray-300 placeholder:text-gray-300'
            />
            <input 
                type='text' 
                name='password'
                onChange={(e)=>handleChange(e,value,setValue)}
                placeholder='Enter password' 
                className='w-full p-2 rounded-md border border-gray-300 placeholder:text-gray-300'
            />
            <button
                className='w-full p-2 text-center bg-blue-500 text-white rounded-lg'
            >
                {
                    loading ? 'Please wait...' : 'Signin'
                }
            </button>
        </form>
    );
};

export default Signin;