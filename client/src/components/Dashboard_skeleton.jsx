import React from 'react';
import Heading from './Heading';

const Dashboard_skeleton = () => {
    const data = [1,2,3,4,5,6,7,8,9,10]
    return (
        <div
            className='p-4'
        >
            <Heading>Dashborad</Heading>
            <div className='w-full grid grid-cols-2 md:grid-cols-4 text-white gap-3'>
                {
                    data.map((d,i)=><div
                        key={i} 
                        className='bg-gray-100 flex justify-between items-center rounded-md p-2 space-x-4 animate-pulse '
                    >
                        <div className='w-12'>
                            <span className='w-10 h-10 block rounded-full bg-gray-200'></span>
                        </div>
                        <div
                            className='w-full space-y-2'
                        >
                            <p className='w-full p-2 bg-gray-200'></p>
                            <p className='w-full p-2 bg-gray-200'></p>
                        </div>
                    </div>
                    )
                }
            </div>

            <div className='w-full grid grid-cols-2 gap-3 mt-5'>
                <div className='w-full h-52 p-4 bg-gray-100 rounded-md space-y-2'>
                    <p className='w-9/12 mx-auto p-2 bg-gray-200'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                </div>
                <div className='w-full h-52 p-4 bg-gray-100 rounded-md space-y-2'>
                    <p className='w-9/12 mx-auto p-2 bg-gray-200'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                    <p className='w-full p-2 bg-gray-200 rounded'></p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_skeleton;