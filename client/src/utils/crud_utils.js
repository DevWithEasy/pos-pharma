import axios from 'axios';
import baseUrl from './baseUrl';
import toast_alert from './toast_alert';


export const createData= async(e,path,data,setLoading,onClose,toast) => {
    e.preventDefault()
    try {
        setLoading(true)
        const res = await axios.post(`${baseUrl}/api/${path}/create`,data,{
            headers: {
                authorization : localStorage.getItem('token')
            }
        })
        if (res.status === 200){
            setLoading(false)
            onClose()
            toast_alert(
                toast,
                res.data.message
            )
        }
        
    } catch (error) {
        setLoading(false)
        toast_alert(
            toast,
            error.response.data.message,
            'error'
        )
    }
}

export const updateData= async(e,path,data) => {
    e.preventDefault()
    try {
        const res = await axios.put(`${baseUrl}/api/${path}/update/${data._id}`,data,{
            headers: {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const deleteData= async(path,id) => {
    try {
        const res = await axios.delete(`${baseUrl}/api/${path}/delete/${id}`,{
            headers: {
                authorization : localStorage.getItem('token')
            }
        })
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}