import React, { useRef } from 'react';
import { AiOutlinePrinter } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import useUserStore from '../../../store/userStore';

const Purchase = () => {
    const {purchases} = useUserStore()
    const {id} = useParams()
    const printRef = useRef()
    const navigate = useNavigate()
    const purchase = purchases.find(p=>p._id === id)

    const handlePrint = useReactToPrint({
        content : ()=> printRef.current,
        documentTitle : purchase?._id
    })
    return (
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
                    <p>Puchase by : </p>
                    <div>
                        <p>
                            {purchase?.user?.name}
                        </p>
                        <p>
                            {purchase?.user?.phone}
                        </p>
                    </div>
                </div>
                <div>
                    <p>
                        <b>Invoice No : </b>
                        {purchase?._id}
                    </p>
                    <p>
                        <b>Invoice Date : </b>
                        {new Date(purchase?.createdAt).toDateString()}
                    </p>
                </div>
            </div>

            <div className='my-5'>
                <div className="relative overflow-x-auto space-y-3">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left">
                                    Sl
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Total quantity
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    Total price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                purchase.products && purchase.products.map((product,i) => <tr 
                                    key={product._id}
                                    className='border-b cursor-pointer hover:bg-blue-100'
                                >
                                    <td className="px-6 py-3 text-left">
                                        {i+1}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {product?.name}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {product?.price}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {product?.quantity}
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        {product?.totalPrice}
                                    </td>
                                </tr>
                                )
                            }
                            <tr>
                                    <td colSpan='2' className="px-6 py-3 text-center">
                                        
                                    </td>
                                    <td colSpan='2' className="px-6 py-3 font-bold text-left">
                                        Total Paid
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        {purchase?.total}
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
    );
};

export default Purchase;