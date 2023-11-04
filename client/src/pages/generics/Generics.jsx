import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Delete_data from '../../components/Delete_data';
import Heading from '../../components/Heading';
import Search from '../../components/Search';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';

const Generics = () => {
    const navigate = useNavigate()
    const {addGenerics,generics} = useUserStore()
    const [remove,setRemove] = useState(false)
    const [query,setQuery] = useState('')
    const getGenerics = async() =>{
        try {
            const res = await axios.get(`${baseUrl}/api/generic`)
            if(res.status === 200){
                addGenerics(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getGenerics()
    },[])

    return (
        <div className='p-2'>
            <Search
                {...{
                    placeholder : 'Search by name',
                    setQuery
                }}
            />
            <Heading>Generics</Heading>
            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Sl
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Generic name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            generics.filter(generic=>generic.name.toLowerCase().includes(query)).map((generic,i)=><tr 
                                    key={generic._id}
                                    className='bg-white cursor-pointer border-b'
                                >
                                <td className="px-6 py-3 text-center">{i+1}</td>
                                <td className="px-6 py-3 text-center">{generic?.name}</td>
                                <td className="px-6 py-3 text-center space-x-2">
                                    <button 
                                        onClick={()=>{
                                            navigate(`/generic/${generic._id}`)
                                        }} 
                                        className='p-1.5 bg-green-400 text-white rounded-md'
                                    >
                                        <MdEditSquare/>
                                    </button>
                                    <button 
                                        onClick={()=>{
                                            setRemove(true)
                                        }}
                                        className='p-2 bg-red-500 text-white rounded-md'
                                    >
                                        <MdDelete/>
                                    </button>
                                    {remove && <Delete_data {...{
                                        id : generic._id,
                                        path : 'generic',
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

export default Generics;