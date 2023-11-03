import React from 'react';
import useProductStore from '../store/productStore';
import { useToast } from '@chakra-ui/react';
import toast_alert from '../utils/toast_alert';

const Product = ({product}) => {
    const {addCart} = useProductStore()
    const toast = useToast()
    const {name,price,quantity} = product

    const addToCart = (product) =>{
        if(product.quantity <= 0){
            return toast_alert(
                toast,
                'Product no available stock.',
                'error'
            )
        }else{
            addCart(product)
            return toast_alert(
                toast,
                'Product added to cart',
            )
        }
    }

    return (
        <div
            onClick={()=>addToCart(product)}
            className={`p-2 bg-white border rounded-md cursor-pointer hover:shadow-md transition-all duration-300 ${quantity === 0 ? 'border-red-200 hover:border-red-500' : 'border-blue-100 hover:border-sky-500'}`}
        >
            <p className=''>{name}</p>
            <div className='flex justify-between space-x-2 text-xs'>
                <p>
                    <span>Price : </span>
                    <span className=''>{price} ৳</span>
                </p>
                <p>
                    <span>Stock : </span>
                    <span className=''>{quantity}</span>  
                </p>
                
            </div>
        </div>
    );
};

export default Product;