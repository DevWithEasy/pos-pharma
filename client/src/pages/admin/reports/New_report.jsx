import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import Heading from '../../../components/Heading';
import baseUrl from '../../../utils/baseUrl';
import handleChange from '../../../utils/handleChange';
import toast_alert from '../../../utils/toast_alert';

const New_report = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = new Date(date.getFullYear(), month+1 , 0).getDate()
    const start = `${year}-${String(month + 1).padStart(2, '0')}-01`
    const end = `${year}-${String(month + 1).padStart(2, '0')}-${days}`
    const month_name = date.toLocaleString('default', { month: 'long' });

    const toast = useToast()
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({})
    const [value,setValue] = useState({
        start : start,
        end : end
    })
    const generateReport = async()=>{
        setLoading(true)
        try {
            const res = await axios.post(`${baseUrl}/api/report`,value,{
                headers : {
                    authorization : localStorage.getItem('token')
                }
            })
            if(res.data.status === 200){
                setLoading(false)
                setData({
                    from : start,
                    to : end,
                    year : year,
                    month : month_name,
                    purchase : res.data?.data?.purchase?.value,
                    sale : res.data?.data?.invoice?.value
                })
            }
            
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const createReport = async()=>{
        try {
            const res = await axios.post(`${baseUrl}/api/report/create`,data,{
                headers : {
                    authorization : localStorage.getItem('token')
                }
            })
            console.log(res.data.data)
            if(res.data.status === 200){
                setData({})
                toast_alert(
                    toast,
                    res.data.message
                )
            }
            
        } catch (error) {
            console.log(error)
            toast_alert(
                toast,
                'Report created failed.',
                'error'
            )
        }
    }

    return (
        <div
            className='p-4'
        >
            <Heading>Monthly Report Generate</Heading>
            <div
                className='space-y-2'
            >
                <div className='flex justify-center gap-4'>
                    <div
                        className='space-y-2'
                    >
                        <label
                            className='block'
                        >Start Date :</label>
                        <input
                            type='date'
                            name='start'
                            value={value?.start}
                            onChange={(e)=>handleChange(e,value,setValue)}
                            className='p-2 border rounded-md border-gray-300 focus:outline-none focus:border-sky-500'
                        />
                    </div>
                    <div
                        className='space-y-2'
                    >
                        <label
                            className='block'
                        >End Date :</label>
                        <input
                            type='date'
                            name='end'
                            value={value?.end}
                            onChange={(e)=>handleChange(e,value,setValue)}
                            className='p-2 border rounded-md border-gray-300 focus:outline-none focus:border-sky-500'
                        />
                    </div>
                </div>
                <div
                    className='flex justify-center'
                >
                    <button
                        onClick={()=>generateReport()}
                        className='px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600'
                    >
                        {loading ? 'Generating...' : 'Generate Report'}
                    </button>
                </div>
            </div>
            <div
                className='w-1/2 mx-auto mt-5'
            >
                {!data.from ? 
                <p className='text-center text-xs text-gray-500 animate-pulse p-10'>
                    Report will be generate between two date...
                </p>
                :
                <div className="relative overflow-x-auto p-4 space-y-2 bg-white rounded-md">
                    <table className="w-full text-sm text-left text-gray-500 border">
                        <tbody>
                            <tr
                                className='border-b'
                            >
                                <td className='p-2 border-r'>From</td>
                                <td className='p-2 text-right'>{data?.from}</td>
                            </tr>
                            <tr
                                className='border-b'
                            >
                                <td className='p-2 border-r'>To</td>
                                <td className='p-2 text-right'>{data?.to}</td>
                            </tr>
                            <tr
                                className='border-b'
                            >
                                <td className='p-2 border-r'>Year</td>
                                <td className='p-2 text-right'>{data?.year}</td>
                            </tr>
                            <tr
                                className='border-b'
                            >
                                <td className='p-2 border-r'>Month</td>
                                <td className='p-2 text-right'>{data?.month}</td>
                            </tr>
                            <tr
                                className='border-b'
                            >
                                <td className='p-2 border-r'>Purchase</td>
                                <td className='p-2 text-right'>{data?.purchase}</td>
                            </tr>
                            <tr
                                className='border-b'
                            >
                                <td className='p-2 border-r'>Invoice</td>
                                <td className='p-2 text-right'>{data?.sale}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button
                        onClick={()=>createReport()}
                        className='w-full px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600'
                    >
                        Create Report
                    </button>
                </div>
                }
            </div>
        </div>
    );
};

export default New_report;