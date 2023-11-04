import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';
import handleChange from '../../utils/handleChange';
import toast_alert from '../../utils/toast_alert';

const Update_company = () => {
    const {companies} = useUserStore();
    const {id} = useParams()
    const toast = useToast()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [value,setValue] = useState(companies.find(c => c._id === id))
    const updateCompany= async(e) => {
      e.preventDefault()
      setLoading(true)
      try {
          const res = await axios.put(`${baseUrl}/api/company/update/${value._id}`,value,{
              headers: {
                  authorization : localStorage.getItem('token')
              }
          })
          if(res.data.status === 200){
              setLoading(false)
              toast_alert(
                  toast,
                  res.data.message
              )
              navigate('/companies')
          }
      } catch (error) {
          setLoading(false)
          toast_alert(
            toast,
            error?.response?.data?.message,
            'error'
          )
          console.log(error)
      }
    }
    return (
        <div
          className='p-2'
        >
          <Heading>Update company</Heading>
          <form 
            onSubmit={(e)=>updateCompany(e)}
            className='w-1/2 mx-auto space-y-2 p-4 bg-white rounded shadow'
          >
            <div className='space-y-2'>
                  <label htmlFor="">Company Name :</label>
                  <input 
                      type='text' 
                      name='name'
                      value={value.name}
                      onChange={(e)=>handleChange(e,value,setValue)} 
                      className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                  />
              </div>
              <button
                className='px-6 py-2 bg-sky-500 text-white rounded'
              >
                {
                  loading ? 'Updating...' : 'Submit'
                }
              </button>
          </form>
        </div>
    );
};

export default Update_company;