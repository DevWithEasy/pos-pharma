const get_fixed_num=(number)=>{
    const num = number ? Number(number.toFixed(2)) : 0
    return num
}

export default get_fixed_num