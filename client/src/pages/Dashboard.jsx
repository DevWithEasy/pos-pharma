import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineBarChart, AiOutlineLineChart, AiOutlineUserSwitch } from 'react-icons/ai';
import { GiMedicines } from 'react-icons/gi';
import { MdOutlineSell } from 'react-icons/md';
import { RxAvatar, RxHeart, RxHome } from 'react-icons/rx';
import { TbMoneybag } from 'react-icons/tb';
import Dashboard_skeleton from '../components/Dashboard_skeleton';
import Heading from '../components/Heading';
import ReportChart from '../components/ReportChart';
import baseUrl from '../utils/baseUrl';
import get_fixed_num from '../utils/get_fixed_num';

const Dashboard = () => {
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState({})
    const getDashboardData =async()=>{
        setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/api/auth/dashboard`,{
                headers: {
                    authorization : localStorage.getItem('token')
                }
            })
            if(res.data.status === 200){
                setLoading(false)
                setData(res.data.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const {users,companies,generics,customers,current_month,product,total} = data

    const benifits = (product?.stock_value + total?.sale) - total?.purchase

    const benifits_percent = (benifits / total?.purchase
)*100
    useEffect(() =>{
        getDashboardData()
    },[])

    
    return (
        <>
            {loading ? 
                <Dashboard_skeleton/>
                :
                <div className='p-4'>
                    <Heading>Dashborad</Heading>
                    <div className='w-full grid grid-cols-2 md:grid-cols-4 text-white gap-3'>
                        <div className='bg-green-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <RxAvatar size={40} className='shrink-0'/>
                            <div>
                                <p>Total Users : </p>
                                <p className='text-2xl font-bold text-center'>{users}</p>
                            </div>
                        </div>
                        <div className='bg-cyan-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <RxHome size={40} className='shrink-0'/>
                            <div>
                                <p>Total Company : </p>
                                <p className='text-2xl font-bold text-center'>{companies}</p>
                            </div>
                        </div>
                        <div className='bg-yellow-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <RxHeart size={40} className='shrink-0'/>
                            <div>
                                <p>Total Generics : </p>
                                <p className='text-2xl font-bold text-center'>{generics}</p>
                            </div>
                        </div>
                        <div className='bg-teal-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <GiMedicines size={40} className='shrink-0'/>
                            <div>
                                <p>Total Products : </p>
                                <p className='text-2xl font-bold text-center'>
                                    {product?.total_products ?
                                    product?.total_products : 0 }
                                </p>
                            </div>
                        </div>
                        <div className='bg-teal-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <AiOutlineUserSwitch size={40} className='shrink-0'/>
                            <div>
                                <p>Total Customers : </p>
                                <p className='text-2xl font-bold text-center'>{customers}</p>
                            </div>
                        </div>
                        <div className='bg-sky-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <TbMoneybag size={40} className='shrink-0'/>
                            <div>
                                <p>Total Investment : </p>
                                <p className='text-2xl font-bold text-center'>
                                    {total && get_fixed_num(total?.purchase)}
                                </p>
                            </div>
                        </div>
                        <div className='bg-red-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <MdOutlineSell size={40} className='shrink-0'/>
                            <div>
                                <p>Total Sales : </p>
                                <p className='text-2xl font-bold text-center'>
                                    {total && get_fixed_num(total?.sale)}
                                </p>
                            </div>
                        </div>
                        <div className='bg-blue-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <AiOutlineLineChart size={40} className='shrink-0'/>
                            <div>
                                <p>Total Stock : </p>
                                <p className='text-2xl font-bold text-center'>
                                    {product ? get_fixed_num(product?.stock_value) : 0 }
                                </p>
                            </div>
                        </div>
                        <div className='bg-green-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <AiOutlineBarChart size={40} className='shrink-0'/>
                            <div>
                                <p>Total Benifits : </p>
                                <p className='text-2xl font-bold text-center'>
                                    {benifits ? get_fixed_num(benifits) : 0}
                                </p>
                            </div>
                        </div>
                        <div className='bg-yellow-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <TbMoneybag size={40} className='shrink-0'/>
                            <div>
                                <p>This month purchase : </p>
                                <p className='text-2xl font-bold text-center'>{current_month?.purchase ? current_month?.purchase : 0}</p>
                            </div>
                        </div>
                        <div className='bg-cyan-400 flex items-center rounded-md p-2 space-x-4 shadow'>
                            <MdOutlineSell size={40} className='shrink-0'/>
                            <div>
                                <p>This Month Sale : </p>
                                <p className='text-2xl font-bold text-center'>{current_month && get_fixed_num(current_month?.sale)}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className='w-full grid grid-cols-2 gap-3 mt-5'
                    >
                        {data.reports && 
                            <ReportChart 
                            {...{
                                reports : data.reports
                            }}
                            />
                        }
                        <div
                            className='w-full flex flex-col  items-center space-y-3 bg-white border rounded p-2'
                        >
                            <p
                                className='text-center text-xl font-bold border-b-2'
                            >
                                Profit (%)
                            </p>
                            <div
                                className='h-40 w-40 flex justify-center items-center border-[10px] border-sky-500 rounded-full'
                            >
                                <span
                                    className='font-bold text-2xl text-sky-500'
                                >
                                    {
                                        benifits_percent ? get_fixed_num(benifits_percent) : 0
                                    }%
                                </span>
                            </div>
                            <p
                                className=''
                            >
                                This profit % generate by total purchase value,current stock value and total sale value.
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Dashboard;