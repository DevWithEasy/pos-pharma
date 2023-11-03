import React, { useEffect, useState } from 'react';
import useProductStore from '../store/productStore';
import {RxCrossCircled} from 'react-icons/rx'
import { useToast } from '@chakra-ui/react';

const OrderItem = ({product}) => {
    const {removeCart,adjustQuantity} = useProductStore()
    const toast = useToast()
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

    const value = Number((product?.price * product?.qty).toFixed(2))

    useEffect (()=>{
        setQty(product.qty)
    })
    return (
        <tr className="bg-white border-b ">
            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap">
                {product.name}
            </th>
            <td className="px-6 py-2 text-center">
                {product.price}
            </td>
            <td className="px-6 py-2 text-center">
                <input type='number' value={qty} min='1' onChange={(e)=>handleQtyChange( e)} className='w-20 border outline-none rounded-lg text-center p-1'/>
            </td>
            <td className="px-6 py-2 text-center">
                {value}
            </td>
            <td className="px-6 py-2 flex justify-center items-center">
                <RxCrossCircled onClick={()=>removeCart(product._id)} size={25} className='text-red-500 shrink-0 cursor-pointer'/>
            </td>
        </tr>
    );
};

export default OrderItem;