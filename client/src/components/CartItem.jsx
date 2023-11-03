import React, { useEffect, useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import useProductStore from '../store/productStore';

const CartItem = ({product}) => {
    const {removeCart,adjustQuantity} = useProductStore()
    const [qty,setQty] = useState(1)
    function handleQtyChange(e) {
        if(product.quantity < Number(e.target.value)){
            return toast({
                title: 'Product no available stock.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }else{
            setQty(e.target.value)
            adjustQuantity(product._id , e.target.value)
        }
    }

    const value = product?.price * product.qty
    
    useEffect (()=>{
        setQty(product.qty)
    })
    return (
        <div className='flex justify-between items-center p-2 space-x-2'>
            <p className='w-8/12 flex items-center space-x-3'>
                <RxCrossCircled onClick={()=>removeCart(product.id)} size={20} className='text-red-500 shrink-0'/>

                <span>{product?.name}</span>
            </p>
            <input type='number' value={qty} min='1' onChange={(e)=>handleQtyChange(e)} className='w-20 border outline-none rounded-lg text-center p-1'/>
            <p className='w-2/12 text-center'>{value} /-</p>
        </div>
    );
};

export default CartItem;