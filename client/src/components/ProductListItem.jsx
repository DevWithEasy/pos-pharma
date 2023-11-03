import React, { useState } from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Delete_data from './Delete_data';

const ProductListItem = ({product}) => {
    const navigate = useNavigate()
    const [remove,setRemove] = useState(false)
    return (
        <tr className={`bg-white border-b ${product.quantity === 0 ? 'text-red-500' :''}`}>
            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap">
                {product.name}
            </th>
            <td className="px-6 py-2 text-center">
                {product?.generic?.name}
            </td>
            <td className="px-6 py-2 text-center">
                {product?.company?.name}
            </td>
            <td className="px-6 py-2 text-center">
                {product.sku} {product.sku_unit}
            </td>
            <td className="px-6 py-2 text-center">
                {product.type}
            </td>
            <td className="px-6 py-2 text-center">
                {product.price}
            </td>
            <td className="px-6 py-2 text-center">
                {product.quantity}
            </td>
            <td className="px-6 py-2 flex justify-center items-center space-x-2">
                <button 
                    onClick={()=>{
                        navigate(`/product/${product._id}`)
                    }} 
                    className='p-1.5 bg-green-400 text-white rounded-md'
                >
                    <MdEditSquare/>
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
                    id : product._id,
                    path : 'product',
                    remove,
                    setRemove
                }}/>}
            </td>
        </tr>
    );
};

export default ProductListItem;