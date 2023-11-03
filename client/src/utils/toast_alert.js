const toast_alert = (toast,msg,status = 'success',time = 3) =>{
    return toast({
        title: msg,
        status: status,
        duration: time * 1000,
        isClosable: true,
    })
}
export default toast_alert