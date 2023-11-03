import React from 'react';

const Search = ({placeholder,setQuery}) => {
    return (
        <div className='absolute top-3 '>
            <input 
                type="search"
                onChange={(e)=>setQuery(e.target.value.toLowerCase())}
                placeholder={placeholder}
                className='w-[350px] py-1 px-4 border border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm rounded-full'
            />
        </div>
    );
};

export default Search;