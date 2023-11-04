import {
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading';
import Loading_request from '../../components/Loding_request';
import baseUrl from '../../utils/baseUrl';
import handleChange from '../../utils/handleChange';
import toast_alert from '../../utils/toast_alert';

const New_company = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState({
      name : ''
    })
    const createCompany= async(e) => {
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
          const res = await axios.post(`${baseUrl}/api/company/create`,value,{
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
              navigate('/companies')
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
    <div className='p-4'>
      <Heading>Add new company</Heading>
        <form
          className='w-1/2 mx-auto space-y-2 p-4 bg-white rounded shadow'
        >
            <div className='space-y-2'>
                <label htmlFor="">Company Name :</label>
                <input 
                    type='text' 
                    name='name'
                    onChange={(e)=>handleChange(e,value,setValue)} 
                    className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                />
            </div>
            <button 
              onClick={(e)=>createCompany(e)}
              className='px-6 py-2 bg-sky-500 text-white rounded'
            >
              Submit
            </button>
        </form>
        <Loading_request {...{loading,setLoading}}/>
    </div>
  )
};

export default New_company;