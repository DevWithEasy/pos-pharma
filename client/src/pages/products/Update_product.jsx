import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';
import handleChange from '../../utils/handleChange';
import toast_alert from '../../utils/toast_alert';

const Update_product = () => {
    const {products} = useUserStore();
    const {id} = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const [value,setValue] = useState(products.find(p => p._id === id))
    const [companies,setCompanies] = useState([])
    const [generics,setGenerics] = useState([])
    const [loading,setLoading] = useState(false)
    const [updating,setUpdating] = useState(false)

    const getData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/api/product/findGenericBrand`)
            if(res.data.status ===200){
                setCompanies(res.data.data.companies)
                setGenerics(res.data.data.generics)
                setLoading(false)
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

    const updateProduct= async(e) => {
        e.preventDefault()
        setUpdating(true)
        try {
            const res = await axios.put(`${baseUrl}/api/product/update/${value._id}`,value,{
                headers: {
                    authorization : localStorage.getItem('token')
                }
            })
            if(res.data.status === 200){
                setUpdating(false)
                toast_alert(
                    toast,
                    res.data.message
                )
                navigate('/products')
            }
        } catch (error) {
            setUpdating(false)
            toast_alert(
                toast,
                error?.response?.data?.message
            )
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    },[])
    console.log(value)
    return (
        <div className='p-4'>
            <Heading>Update Product</Heading>
                    <form 
                        onSubmit={(e)=>updateProduct(e)}
                        className="w-1/2 mx-auto grid grid-cols-2 gap-3 p-4 bg-white rounded shadow"
                    >
                                    <div className='w-full space-y-2'>
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
                                            <option value="mg">mg</option>
                                            <option value="ml">ml</option>
                                        </select>
                                    </div>

                                    <div className='w-full space-y-2'>
                                        <label htmlFor="" className='flex items-center space-x-3'>Generic : 
                                        {loading && <Loading msg='finding generic and brand'/>}
                                        </label>
                                        <select
                                            name='generic'
                                            value={value.generic}
                                            onChange={(e)=>handleChange(e,value,setValue)}
                                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                                        >
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
                                            <option value="Tablet">Tablet</option>
                                            <option value="Capsule">Capsule</option>
                                            <option value="Syrup">Syrup</option>
                                            <option value="Suspension">Suspension</option>
                                            <option value="Cream">Cream</option>
                                        </select>
                                    </div>
                                    <button 
                                        className='px-6 py-2 bg-sky-500 text-white rounded'
                                    >
                                        {
                                        updating ? 'Updating...' : 'Submit'
                                        }
                                    </button>                       
                    </form>
    
        </div>
    );
};

export default Update_product;