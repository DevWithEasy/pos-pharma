import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStore';
import useUserStore from '../store/userStore';
import img from '../assets/user.png'
import { AiOutlineLogin } from 'react-icons/ai';

const Header = () => {
    const {user} = useUserStore()
    const navigate = useNavigate()
    const {cart} = useProductStore()
    return (
        <div className='absolute top-0 left-0 w-full flex justify-between items-center px-4 py-2'>
            <div className='w-8/12'>
                {/* <input className='w-full p-2'/> */}
            </div>
            <div className='w-4/12 flex justify-end space-x-4'>
                <div className='relative w-10 h-10 flex justify-center items-center'>
                    <AiOutlineShoppingCart onClick={()=>navigate('/order')} size={30} className='cursor-pointer text-white'/>
                    { cart.length >0 && <div className='absolute -top-1 -right-2 flex justify-center items-center bg-red-500 text-white w-5 rounded-full h-5 text-sm'>
                        <span>{cart.length}</span>
                    </div>}
                </div>
                <div
                    className='flex space-x-2 px-2 py-0.52 bg-white rounded-md shadow'
                >
                    <img
                        src={img}
                        alt='user'
                        className='w-7 h-7 my-auto rounded-full'
                    />
                    <div
                        className=''
                    >
                        <p className='text-sm'>{user?.name}</p>
                        <p className='text-xs'>{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;