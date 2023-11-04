import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Delete_data from '../../components/Delete_data';
import Heading from '../../components/Heading';
import Search from '../../components/Search';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';

const Customers = () => {
    const navigate = useNavigate()
    const {addCustomers,customers} = useUserStore()
    const [remove,setRemove] = useState(false)
    const [query,setQuery] = useState('')
    const getCustomers = async() =>{
        try {
            const res = await axios.get(`${baseUrl}/api/customer`)
            if(res.status === 200){
                addCustomers(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCustomers()
    },[])

    return (
        <div className='p-2'>
            <Search
                {...{
                    placeholder : 'Search name or phone number',
                    setQuery
                }}
            />
            <Heading>Customers</Heading>
            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Sl
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.filter(customer=>customer.name.toLowerCase().includes(query) || customer.phone.toLowerCase().includes(query))
                            .map((customer,i)=><tr 
                                    key={customer._id}
                                    className='bg-white cursor-pointer border-b'
                                >
                                <td className="px-6 py-3 text-center">{i+1}</td>
                                <td className="px-6 py-3 text-center">{customer?.name}</td>
                                <td className="px-6 py-3 text-center">{customer?.phone}</td>
                                <td className="px-6 py-3 text-center space-x-2">
                                    <button 
                                        onClick={()=>{
                                            navigate(`/customer/${customer._id}`)
                                        }} 
                                        className='p-1.5 bg-green-400 text-white rounded-md'
                                    >
                                        <MdEditSquare/>
                                    </button>
                                    <button 
                                        onClick={()=>{
                                            setRemove(true)
                                        }}
                                        className='p-1.5 bg-red-500 text-white rounded-md'
                                    >
                                        <MdDelete/>
                                    </button>
                                    {remove && <Delete_data {...{
                                        id: customer._id,
                                        path : 'customer',
                                        remove, 
                                        setRemove
                                    }}/>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;