import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdInfo } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Delete_data from '../../../components/Delete_data';
import Heading from '../../../components/Heading';
import Search from '../../../components/Search';
import useUserStore from '../../../store/userStore';
import baseUrl from '../../../utils/baseUrl';

const Purchases = () => {
    const navigate = useNavigate()
    const {addPurchases,purchases} = useUserStore()
    const [remove,setRemove] = useState(false)

    const getPurchases = async() =>{
        try {
            const res = await axios.get(`${baseUrl}/api/purchase`)
            if(res.status === 200){
                addPurchases(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getPurchases()
    },[])
    return (
        <div
            className='p-2'
        >
            <Search
                {...{
                    placeholder : 'Find purchase by last 4 word'
                }}
            />
            <Heading>Purchase History</Heading>
            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Purchase by
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Total Value
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            purchases.map((purchase,i)=><tr 
                                    key={purchase._id}
                                    className='bg-white border-b cursor-pointer'
                                >
                                <td className="px-6 py-3 text-left">{purchase?._id}</td>
                                <td className="px-6 py-3 text-center">{purchase?.user?.name}</td>
                                <td className="px-6 py-3 text-center">{purchase?.total}</td>
                                <td className="px-6 py-3 text-center space-x-2">
                                    <button 
                                        onClick={()=>{
                                            navigate(`/admin/purchase/${purchase._id}`)
                                        }}
                                        className='p-1.5 bg-green-400 text-white rounded-md'
                                    >
                                        <MdInfo/>
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
                                        id : purchase._id,
                                        path : 'purchase', 
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

export default Purchases;