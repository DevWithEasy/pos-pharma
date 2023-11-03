import React from 'react';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { GiMedicines } from 'react-icons/gi';
import { MdOutlineAdd, MdOutlineSell } from 'react-icons/md';
import { RxAvatar, RxHeart, RxHome } from 'react-icons/rx';
import { TbReportAnalytics } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import Heading from '../components/Heading';

const Admin = () => {

    const info_data = [
        {
            title : 'Products',
            icon : <GiMedicines size={20}/>,
            paths : [
                {
                    title : 'Create new product',
                    icon : <MdOutlineAdd/>,
                    path : '/product/new'
                },
                {
                    title : 'Products',
                    icon : <GiMedicines/>,
                    path : '/products'
                }
            ]
        },
        {
            title : 'Generics',
            icon : <RxHeart size={20}/>,
            paths : [
                {
                    title : 'Create new generic',
                    icon : <MdOutlineAdd/>,
                    path : '/generic/new'
                },
                {
                    title : 'Generics',
                    icon : <RxHeart/>,
                    path : '/generics'
                }
            ]
        },
        {
            title : 'Companies',
            icon : <RxHome size={20}/>,
            paths : [
                {
                    title : 'Create new company',
                    icon : <MdOutlineAdd/>,
                    path : '/company/new'
                },
                {
                    title : 'Companies',
                    icon : <RxHome/>,
                    path : '/companies'
                }
            ]
        },
        {
            title : 'Customers',
            icon : <AiOutlineUserSwitch size={20}/>,
            paths : [
                {
                    title : 'Create new customer',
                    icon : <MdOutlineAdd/>,
                    path : '/customer/new'
                },
                {
                    title : 'Customers',
                    icon : <AiOutlineUserSwitch/>,
                    path : '/customers'
                }
            ]
        },
        {
            title : 'Users',
            icon:<RxAvatar size={20}/>,
            paths : [
                {
                    title : 'Add new user',
                    icon : <MdOutlineAdd/>,
                    path : '/admin/user/new'
                },
                {
                    title : 'Users',
                    icon : <RxAvatar/>,
                    path : '/admin/users'
                }
            ]
        }  
    ]

    const report_data = [
        {
            title : 'Purchases',
            icon : <MdOutlineSell size={20}/>,
            paths : [
                {
                    title : 'Create new purchase',
                    icon : <MdOutlineAdd/>,
                    path : '/admin/purchase/new'
                },
                {
                    title : 'Purchases history',
                    icon : <MdOutlineSell/>,
                    path : '/admin/purchases'
                }
            ]
        },
        {
            title : 'Reports',
            icon : <TbReportAnalytics size={20}/>,
            paths : [
                {
                    title : 'Create new report',
                    icon : <MdOutlineAdd/>,
                    path : '/admin/report/new'
                },
                {
                    title : 'Reports data',
                    icon : <TbReportAnalytics/>,
                    path : '/admin/reports'
                }
            ]
        }
    ]
    
    return (
        <div className='p-4'>
            <Heading>Admin</Heading>
            <h2 className='bg-white p-2 my-2 text-xl font-bold border-b'>Information and data</h2>
            <div className='w-full grid grid-cols-3 gap-3'>
                {
                    info_data.map((item, index) =><div
                        key={index}
                        className='bg-white rounded shadow'
                    >
                        <h2
                            className='flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white font-bold rounded-tl rounded-tr'
                        >
                            {item?.icon}
                            <span>{item?.title}</span>
                        </h2>
                        <div
                            className='p-2 space-y-2'
                        >
                            {
                                item?.paths.map((d,i)=><NavLink
                                    key={i}
                                    to={d?.path}
                                    className='p-2 flex items-center space-x-2 border border-sky-50  hover:bg-sky-500 hover:text-white rounded transition-all duration-300'
                                >
                                    {d?.icon}
                                    <span>
                                        {d?.title}
                                    </span>
                                </NavLink>)
                            }
                        </div>
                    </div>)
                }
            </div>
            <h2 className='bg-white p-2 my-2 text-xl font-bold border-b'>Purchase and report</h2>
            <div className='w-full grid grid-cols-3 gap-3'>
                {
                    report_data.map((item, index) =><div
                        key={index}
                        className='bg-white border border-blue-50 rounded'
                    >
                        <h2
                            className='flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white font-bold rounded-tl rounded-tr'
                        >
                            {item?.icon}
                            <span>{item?.title}</span>
                        </h2>
                        <div
                            className='p-2 space-y-2'
                        >
                            {
                                item?.paths.map((d,i)=><NavLink
                                    key={i}
                                    to={d?.path}
                                    className='p-2 flex items-center space-x-2 border border-sky-50  hover:bg-sky-500 hover:text-white rounded transition-all duration-300'
                                >
                                    {d?.icon}
                                    <span>
                                        {d?.title}
                                    </span>
                                </NavLink>)
                            }
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Admin;