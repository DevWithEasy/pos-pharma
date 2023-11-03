import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStore';
import CartItem from './CartItem';

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { HiOutlineShoppingBag } from 'react-icons/hi';

const Cart = ({}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate()
    const {cart} = useProductStore()
    const total = Number(cart.reduce((total, cartItem) => total + cartItem.price * cartItem.qty,0).toFixed(2))
    return (
      <>
      <div className='absolute right-8 top-40 w-16 h-16 shadow-lg rounded-md text-sm'>
                    <p ref={btnRef} onClick={onOpen}  className='h-16 p-2 flex flex-col  items-center bg-slate-400/80 hover:bg-slate-400 text-yellow-200 cursor-pointer'>
                        <HiOutlineShoppingBag size={25}/>
                        <span>{cart.length} Items</span>
                    </p>
                    <p className='text-center bg-slate-100'>{total} ৳</p>
                </div>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='md'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart items</DrawerHeader>

          <DrawerBody>
            {
              !cart.length > 0 ?
              <h1 className='text-center'>Cart is empty</h1> : 
              <>
                <div>
                  {cart.map((product) => <CartItem key={product._id} {...{ product }} />)}
                </div>
                <div className='my-5'>
                  <p className='flex justify-between items-center p-4'>
                    <span>Total</span>
                    <span>{total} /-</span>
                  </p>
                </div>
                <div className='flex justify-end px-4'>
                  <button 
                    onClick={() => navigate('/order')} 
                    className='px-4 py-2 bg-blue-500 text-white rounded-md'
                    >
                      Place order
                    </button>
                </div>
              </>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
    );
};

export default Cart;