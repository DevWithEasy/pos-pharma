import { useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Heading from '../../../components/Heading';
import Loading_request from '../../../components/Loding_request';
import baseUrl from '../../../utils/baseUrl';
import handleChange from '../../../utils/handleChange';
import toast_alert from '../../../utils/toast_alert';

const New_purchase = () => {
    const toast = useToast()
    const { onClose } = useDisclosure()
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState('')
    const [check,setCheck] = useState()
    const [find,setFind] = useState([])
    const [products,setProducts] = useState([])
    const [_id,set_id] = useState('')
    const [name,setName]  = useState('')
    const [price,setPrice] = useState('')
    const [totalPrice,setTotalPrice] = useState('')
    const [quantity,setQuantity] = useState('')

    const [calculate,setCalculate] = useState({
        quantity: '',
        price: '',
    })

    const handleCheck=(e)=>{
        if(e.target.checked){
            setCheck(true)
        }else{
            setCheck(false)
        }
    }

    const handleSearch = async(query) =>{
        setSearch(query)
        if(!search){
            return
        }

        try {
            const res = await axios.get(`${baseUrl}/api/product/search?q=${search}`)
            setFind(res.data.data)
        } catch (error) {
            console.log(error)
        }

    }

    const setProduct=(product)=>{
        set_id(product._id)
        setName(product.name)
        setPrice(product.price)
    }

    const cancel = ()=>{
        set_id('')
        setName('')
        setPrice('')
        setTotalPrice('')
        setQuantity('')
        setCalculate({
            quantity: '',
            price: '',
        })
        setCheck(false)
    }

    const addProduct=()=>{
        if (!quantity){
            return toast({
                title: 'Input quantity field empty.',
                status: 'error',
                isClosable: true,
            })
        }
        if(products.length === 0){
            setProducts([
                ...products,
                {
                    _id,
                    name,
                    price,
                    totalPrice,
                    quantity
                }
            ])
            cancel()
        }else{
            const find = products.find(product=>product._id === _id)
            if (find){
                return toast({
                    title: 'already added this product.',
                    status: 'error',
                    isClosable: true,
                })
            }
                setProducts([
                    ...products,
                    {
                        _id,
                        name,
                        price,
                        totalPrice,
                        quantity
                    }
                ])
                cancel()
        }
    }

    const removeProduct =(id)=>{
        setProducts(products.filter(product => product._id !== id))
    }

    const calculation=()=>{
        const price  = Number((Number(calculate.quantity)/Number(calculate.price)).toFixed(2))
        setPrice(price)
    }

    const total = products.reduce((total, product)=> total+Number(product.totalPrice) , 0)

    const createPurchase = async()=>{
        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/purchase/create`,{total,products},{
                headers: {
                    authorization : localStorage.getItem('token')
                }
            })
            if (res.status === 200){
                setProducts([])
                setLoading(false)
                onClose()
                toast_alert(
                    toast,
                    res.data.message
                )
            }
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast_alert(
                toast,
                error.response.data.message,
                'error'
            )
        }
    }
    
    return (
        <div className='p-4'>
            <Heading>Create new purchase</Heading>
            <div className='flex justify-between space-x-2'>
                <div className='w-1/2 space-y-2 bg-white p-2 rounded-md'>
                    <div className="relative overflow-x-auto space-y-3">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                                <tr>
                                    <th scope="col" className="px-2 py-2 text-center">
                                        Sl
                                    </th>
                                    <th scope="col" className="px-6 py-2 text-center">
                                        Name
                                    </th>
                                    <th scope="col" className="p-2 text-center">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-2 text-center">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-2 text-center">
                                        Total Price
                                    </th>
                                    <th scope="col" className="p-2 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product,i)=><tr 
                                            key={product._id}
                                            className='bg-white border-b'
                                        >
                                            <td className='p-2 text-center'>{i+1}</td>
                                            <td className='px-6 py-2 text-center'>{product?.name}</td>
                                            <td className='p-2 text-center'>{product?.price}</td>
                                            <td className='px-6 py-2 text-center'>{product?.quantity}</td>
                                            <td className='px-6 py-2 text-center'>{product?.totalPrice}</td>
                                            <td className='p-2 text-center flex justify-center  text-red-500'>
                                                <RxCross2 
                                                    onClick={()=>removeProduct(product._id)}
                                                    size={20}
                                                    className='cursor-pointer'
                                                />
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {products.length > 0 && 
                        <div
                            className='flex justify-center'
                        >
                            <button
                                onClick={()=>createPurchase()}
                                className='p-2 bg-blue-500 text-white rounded-md mt-10'
                            >
                                Create investment
                            </button>
                            <Loading_request {...{loading,setLoading}}/>
                        </div>
                    }
                </div>
                <div className='w-1/2 bg-white p-2 rounded-md'>
                    <div
                        className=''
                    >
                        <p className='bg-blue-50 p-2 text-xs text-center font-bold uppercase mb-2'>
                            Search product and insert data
                        </p>
                        <input
                            type='search'
                            onChange={(e)=>handleSearch(e.target.value)}
                            className='w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 ring-sky-500 placeholder:text-sm'
                            placeholder='find by product name'
                        />
                        {find && 
                            <div
                                className='py-2'
                            >
                                {
                                    find.map((product) =><button
                                            key={product._id}
                                            onClick={()=>setProduct(product)}
                                            className='m-1 p-1 border rounded-md'
                                        >
                                            {product.name}
                                        </button>
                                    )
                                }
                            </div>
                        }
                    </div>
                    <div
                        className='space-y-2'
                    >

                        <div
                            className='flex space-x-2'
                        >
                            <input
                                name='name'
                                value={name}
                                className='w-full p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                disabled
                            />

                            <input
                                name=''
                                value={price}
                                className='w-full p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                disabled
                            />
                        </div>

                        <div
                            className='flex space-x-2'
                        >
                            <input
                                name='quantity'
                                value={quantity}
                                onChange={(e)=>setQuantity(e.target.value)}
                                className='w-1/2 p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                placeholder='enter total quantity of product'
                            />
                            <input
                                name='quantity'
                                value={totalPrice}
                                onChange={(e)=>setTotalPrice(e.target.value)}
                                className='w-1/2 p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                placeholder='enter total price of product'
                            />
                        </div>

                        <div
                            className='flex items-center space-x-1'
                        >
                            <input
                                id='calculate'
                                type='checkbox'
                                onChange={(e)=>handleCheck(e)}
                            />
                            <label
                                htmlFor='calculate'
                                className='text-sm'
                            >
                                Calculate price (If want update product price)
                            </label>
                        </div>

                        {check && <div
                            className='border space-y-2 rounded-md p-2'
                        >
                            <div
                                className='flex space-x-2'
                            >
                                <input
                                    name='quantity'
                                    onChange={(e)=>handleChange(e,calculate,setCalculate)}
                                    className='w-1/2 p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                    placeholder='enter total quantity'
                                />
                                <input
                                    name='price'
                                    onChange={(e)=>handleChange(e,calculate,setCalculate)}
                                    className='w-1/2 p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                    placeholder='enter total price'
                                />
                            </div>
                            <div
                                className='flex justify-center'
                            >
                                <button
                                    onClick={()=>calculation()}
                                    className='p-2 bg-blue-500 text-white rounded-md'
                                >
                                Calculate   
                                </button>
                            </div>
                        </div>}

                        <div
                            className='space-x-2'
                        >
                            <button
                                onClick={()=>cancel()}
                                className='px-4 py-2 bg-gray-500 text-white rounded-md'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={()=>addProduct()}
                                className='px-4 py-2 bg-blue-500 text-white rounded-md'
                            >
                                Add list
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New_purchase;