import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Heading from '../../components/Heading';
import ProductListItem from '../../components/ProductListItem';
import Search from '../../components/Search';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';

const Products = () => {
    const {products,addProducts} = useUserStore()
    const [query,setQuery] = useState('')
    const getProducts = async() =>{
        try {
            const res = await axios.get(`${baseUrl}/api/product/`)

            addProducts(res.data.data)

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
            <Heading>Products</Heading>
            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Generic
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Brand
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                SKU
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.filter(product=>product.name.toLowerCase().includes(query) || product.company.name.toLowerCase().includes(query) || product.generic.name.toLowerCase().includes(query))
                            .map(product=><ProductListItem key={product._id} {...{product}}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;