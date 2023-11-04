import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cart from '../components/Cart';
import Product from '../components/Product';
import Search from '../components/Search';
import useUserStore from '../store/userStore';
import baseUrl from '../utils/baseUrl';

const Home = () => {
    const [query,setQuery] = useState('')
    const {products,addProducts} = useUserStore()

    const getProducts = async() =>{
        try {
            const res = await axios.get(`${baseUrl}/api/product/`)

            if(res.data.status === 200){
                addProducts(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    },[])
    
    return (
        <div className='p-2'>
            <Search
                {...{
                    placeholder : 'Search by product,generic or company name',
                    setQuery
                }}
            />
            <div className={`w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 overflow-y-auto`}>
                {
                    products.filter(product=>product.name.toLowerCase().includes(query) || product.company.name.toLowerCase().includes(query) || product.generic.name.toLowerCase().includes(query))
                    .map(product =><Product key={product._id} {...{product}}/>)
                }
            </div>
            <Cart/>
        </div>
    );
};

export default Home;