import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Heading = ({children}) => {
    const navigate = useNavigate()
    return (
        <div className='relative flex justify-center items-center  bg-white border-b-2 mb-2'>
            <BsArrowLeft 
                size={25}
                onClick={()=>{
                    navigate(-1)
                }}
                className='absolute left-2 cursor-pointer text-red-500'
            />
            <span className='text-center text-2xl font-bold p-2 uppercase'>{children}</span>
        </div>
    );
};

export default Heading;