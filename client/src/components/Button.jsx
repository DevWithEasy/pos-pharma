import React from 'react';

const Button = ({category,findProductByCategory}) => {
    return (
        <button onClick={()=>findProductByCategory(category)} className='capitalize p-2 border rounded'>
            {category}
        </button>
    );
};

export default Button;