import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import Loading_request from '../../components/Loding_request';
import baseUrl from '../../utils/baseUrl';

const Invoice = () => {
    const {id} = useParams()
    const printRef = useRef()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [invoice,setInvoice] = useState({})
    const getInvoice = async() =>{
        setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/api/invoice/${id}` , {
                headers: {
                    authorization : localStorage.getItem('token')
                }
            })
            if(res.data.status === 200){
                setLoading(false)
                setInvoice(res.data.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const handlePrint = useReactToPrint({
        content : ()=> printRef.current,
        documentTitle : invoice?._id
    })

    useEffect(() => {
        getInvoice()
    },[])

    return (
        <>
            {loading ?
                <Loading_request {...{loading,setLoading}}/>
                : 
                <div
                    ref={printRef}
                    className='bg-white p-4 print:mx-10 m-4 rounded-md'
                >
                    <div className='flex justify-between items-center'>
                        <div className='h-20 w-20 bg-blue-500 rounded-full'>

                        </div>
                        <div className=''>
                            <p>Demo Pharmacy</p>
                            <p>Address Here are</p>
                            <p><b>Reg No :</b> BSC-2392 </p>
                            <p>
                                <b>Phone :</b> 01700000000,
                            </p>
                            <p> 
                                <b>Email :</b> 01700000000 
                            </p>

                        </div>
                    </div>
                    <hr className='my-5'/>
                    <div className='flex justify-between items-center px-5'>
                        <div className='flex space-x-4'>
                            <p>Bill to : </p>
                            <div>
                                <p>
                                    {invoice?.customer?.name}
                                </p>
                                <p>
                                    {invoice?.customer?.phone}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p>
                                <b>Invoice No : </b>
                                {invoice?._id}
                            </p>
                            <p>
                                <b>Invoice Date : </b>
                                {new Date(invoice?.createdAt).toDateString()}
                            </p>
                            <p>
                                <b>Created by : </b>
                                {invoice?.user?.name}
                            </p>
                        </div>
                    </div>

                    <div className='my-5'>
                        <div className="relative overflow-x-auto space-y-3">
                            <table className="w-full text-sm text-left text-gray-500 print:text-gray-700">
                                <thead className="text-xs  uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left">
                                            Sl
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            SKU
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        invoice.products && invoice.products.map((product,i) => <tr 
                                            key={product._id}
                                            className='border-b print:border-gray-100 cursor-pointer hover:bg-blue-100'
                                        >
                                            <td className="px-6 py-3 text-left">
                                                {i+1}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {product?.name}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {product?.sku} {product?.sku_unit}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {product?.price}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {product?.quantity}
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                {invoice?.paid}
                                            </td>
                                        </tr>
                                        )
                                    }
                                    <tr className='border-t'>
                                            <td colSpan='3' className="px-6 py-3 text-center">
                                                
                                            </td>
                                            <td colSpan='2' className="px-6 py-3 text-left">
                                                Subtotal
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                {invoice?.total}
                                            </td>
                                    </tr>
                                    <tr>
                                            <td colSpan='3' className="px-6 py-3 text-center">
                                                
                                            </td>
                                            <td colSpan='2' className="px-6 py-3 text-left border-b">
                                                Discount
                                            </td>
                                            <td className="px-6 py-3 text-right border-b">
                                                {invoice?.discount}
                                            </td>
                                    </tr>
                                    <tr>
                                            <td colSpan='3' className="px-6 py-3 text-center">
                                                
                                            </td>
                                            <td colSpan='2' className="px-6 py-3 font-bold text-left">
                                                Total Paid
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                {invoice?.paid}
                                            </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='px-5'>
                        <p className='font-bold'>Terms and Conditions</p>
                        <p>* After sale product and value not refundable.</p>
                        <div
                            className='flex space-x-2'
                        >
                            <button
                                onClick={()=>navigate(-1)}
                                className='flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md print:hidden'
                            >
                                <BiArrowBack/>
                                <span>Back</span>
                            </button>
                            <button
                                onClick={()=>handlePrint()}
                                className='flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-md print:hidden'
                            >
                                <AiOutlinePrinter/>
                                <span>Print</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Invoice;