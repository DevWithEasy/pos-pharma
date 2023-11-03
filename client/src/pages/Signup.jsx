import axios from 'axios';
import React, { useState } from 'react';
import handleChange from '../utils/handleChange';
import api_url from '../utils/api_url';

const Signup = () => {
    const [value,setValue] = useState({
        name : '',
        email : '',
        phone : '',
        password : ''
    })
    const signup=async()=>{
        try {
            const res = await axios.post(`${api_url}/api/auth/signup`,value)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-1/2 mt-5 mx-auto space-y-2'>
            <h1 className='text-center text-xl'>Create new account</h1>
            <input 
                type='text' 
                name='name'
                onChange={(e)=>handleChange(e,value,setValue)}
                placeholder='Enter your name' 
                className='w-full p-2 rounded-md border border-gray-300 placeholder:text-gray-300'
            />
            <input 
                type='text' 
                name='email'
                onChange={(e)=>handleChange(e,value,setValue)}
                placeholder='Enter your email address' 
                className='w-full p-2 rounded-md border border-gray-300 placeholder:text-gray-300'
            />
            <input 
                type='text' 
                name='phone'
                onChange={(e)=>handleChange(e,value,setValue)}
                placeholder='Enter your phone number' 
                className='w-full p-2 rounded-md border border-gray-300 placeholder:text-gray-300'
            />
            <input 
                type='text' 
                name='password'
                onChange={(e)=>handleChange(e,value,setValue)}
                placeholder='Enter your password' 
                className='w-full p-2 rounded-md border border-gray-300 placeholder:text-gray-300'
            />
            <button
            onClick={()=>signup()}
                className='w-full p-2 text-center bg-blue-500 text-white rounded-lg'
            >
                Signup
            </button>
        </div>
    );
};

export default Signup;