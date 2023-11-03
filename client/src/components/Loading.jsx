import { Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = ({msg}) => {
    return (
        <div className='flex items-center space-x-2 text-xs'>
            <Spinner size='sm'/>
            <span>{msg}...</span>
        </div>
    );
};

export default Loading;