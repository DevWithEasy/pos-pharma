import React, { useState } from 'react';
import Heading from '../../components/Heading';
import { createData } from '../../utils/crud_utils';
import handleChange from '../../utils/handleChange';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Loading_request from '../../components/Loding_request';
import toast_alert from '../../utils/toast_alert';
import axios from 'axios';
import api_url from '../../utils/api_url';

const New_customer = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
        name : '',
        phone : ''
    })
    const createCustomer= async(e) => {
      e.preventDefault()
      if(!value.name) {
          return toast_alert(
              toast,
              'Please required all field.',
              'error'
          )
      }
      try {
          setLoading(true)
          const res = await axios.post(`${api_url}/customer/create`,value,{
              headers: {
                  authorization : localStorage.getItem('token')
              }
          })
          if (res.data.status === 200){
              setLoading(false)
              toast_alert(
                  toast,
                  res.data.message
              )
              navigate('/customers')
          }
          
      } catch (error) {
        console.log(error)
          setLoading(false)
          toast_alert(
              toast,
              error?.response?.data?.message,
              'error'
          )
      }
    }
    return (
        <div
          className='p-2'
        >
          <Heading>Create new customer</Heading>
          <form
            className='w-1/2 mx-auto space-y-2 p-4 bg-white rounded shadow'
          >
          <div className='space-y-2'>
                <label htmlFor="">Customer Name :</label>
                <input 
                    type='text' 
                    name='name'
                    value={value.name}
                    onChange={(e)=>handleChange(e,value,setValue)} 
                    className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                />
            </div>
            <div className='space-y-2'>
                <label htmlFor="">Customer phone :</label>
                <input 
                    type='text' 
                    name='phone'
                    value={value.phone}
                    onChange={(e)=>handleChange(e,value,setValue)} 
                    className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                />
            </div>
            <button 
              onClick={(e)=>createCustomer(e)}
              className='px-6 py-2 bg-sky-500 text-white rounded'
            >
              Submit
            </button>
          </form>
          <Loading_request {...{loading,setLoading}}/>
        </div>
    );
};

export default New_customer;