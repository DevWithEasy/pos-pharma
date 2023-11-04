import {
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading';
import Loading_request from '../../components/Loding_request';
import baseUrl from '../../utils/baseUrl';
import handleChange from '../../utils/handleChange';
import toast_alert from '../../utils/toast_alert';


const New_product = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [companies,setCompanies] = useState([])
    const [generics,setGenerics] = useState([])
    const [value,setValue] = useState({
        name : '',
        generic : '',
        company : '',
        sku : '',
        sku_unit : 'mg',
        type : 'Tablet',
        price : '',
        quantity : 0,
    })

    const createProduct= async(e) => {
        e.preventDefault()
        if(!value.name || !value.generic || !value.company || !value.sku || !value.sku_unit || !value.type) {
            return toast_alert(
                toast,
                'Please required all field.',
                'error'
            )
        }
        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/product/create`,value,{
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
                navigate('/products')
            }
            
        } catch (error) {
            setLoading(false)
            toast_alert(
                toast,
                error?.response?.data?.message,
                'error'
            )
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/product/findGenericBrand`)
            setCompanies(res.data.data.companies)
            setGenerics(res.data.data.generics)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <div className='p-4'>
            <Heading> Create new product </Heading>
            <form 
                onSubmit={(e)=>createProduct(e)}
                className='w-1/2 mx-auto space-y-2 p-4 bg-white rounded shadow'
            >
                <div className='grid grid-cols-2 gap-3'>
                    <div className='space-y-2'>
                        <label htmlFor="">Name :</label>
                        <input 
                            type='text' 
                            name='name'
                            value={value.name} 
                            onChange={(e)=>handleChange(e,value,setValue)} 
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='w-full space-y-2'>
                            <label htmlFor="">Price :</label>
                            <input 
                                type='text' 
                                name='price'
                                value={value.price} 
                                onChange={(e)=>handleChange(e,value,setValue)} 
                                className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                            />
                        </div>
                        <div className='w-full space-y-2'>
                            <label htmlFor="">Quntity :</label>
                            <input 
                                type='text'
                                name='quantity'
                                value={value.quantity} 
                                onChange={(e)=>handleChange(e,value,setValue)} 
                                className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                                disabled
                            />
                        </div>
                    <div className='w-full space-y-2'>
                            <label htmlFor="">SKU :</label>
                            <input 
                                type='text' 
                                name='sku'
                                value={value.sku} 
                                onChange={(e)=>handleChange(e,value,setValue)} 
                                className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                            />
                        </div>
                        <div className='w-full space-y-2'>
                            <label htmlFor="">SKU Unit :</label>
                            <select
                                name='sku_unit'
                                value={value.sku_unit}
                                onChange={(e)=>handleChange(e,value,setValue)}
                                className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                            >
                                <option value="">Select SKU</option>
                                <option value="mg">mg</option>
                                <option value="ml">ml</option>
                            </select>
                        </div>
                    <div className='w-full space-y-2'>
                            <label htmlFor="">Generic :</label>
                            <select
                                name='generic'
                                value={value.generic}
                                onChange={(e)=>handleChange(e,value,setValue)}
                                className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                            >
                                <option value="">select generic</option>
                                {
                                    generics.map((generic) => <option key={generic._id} value={generic._id}>{generic.name}</option>)
                                }
                            </select>
                        </div>
                        <div className='w-full space-y-2'>
                            <label htmlFor="">Company :</label>
                            <select
                                name='company'
                                value={value.company}
                                onChange={(e)=>handleChange(e,value,setValue)}
                                className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                            >
                                <option value="">select Brand</option>
                                {
                                    companies.map((company) => <option key={company._id} value={company._id}>{company.name}</option>)
                                }
                            </select>
                        </div>
                    <div className='w-full space-y-2'>
                            <label htmlFor="">Type :</label>
                            <select
                                name='type'
                                value={value.type}
                                onChange={(e)=>handleChange(e,value,setValue)}
                                className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                            >
                                <option value="">Select type</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Capsule">Capsule</option>
                                <option value="Syrup">Syrup</option>
                                <option value="Suspension">Suspension</option>
                                <option value="Cream">Cream</option>
                            </select>
                        </div>
                </div>

                    <button
                        type='submit'
                        className='px-6 py-2 bg-sky-500 text-white rounded'
                    >
                        Submit
                    </button>
                    <Loading_request {...{loading,setLoading}}/>
            </form>
        </div>
    );
};

export default New_product;