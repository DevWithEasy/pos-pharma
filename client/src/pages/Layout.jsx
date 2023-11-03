import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import useUserStore from '../store/userStore';

const Layout = () => {
    const {isAuth} = useUserStore()
    return (
        <div className='relative h-screen w-full flex justify-between bg-sky-500'>
            {!isAuth ?
            <Login/>
            :
            <>
                <Sidebar/>
                <div className=' h-screen w-10/12 p-4 pt-14'>
                    <div className='bg-gray-50 h-full rounded-lg overflow-y-auto'>
                        <Header/>
                        <Outlet/>
                    </div>
                </div>
            </> 
            }
        </div>
    );
};

export default Layout;