import {create} from "zustand";
import {devtools,persist} from "zustand/middleware";

const createProductStore = (set)=>({
    cart : [],
    
    addCart : (product)=>{
        set((state) => {
            const inCart = state.cart.find(item=>item._id === product._id ? true : false)
            if (inCart){
                return {cart : state.cart.map(item => item._id === product._id ? {...item,qty : item.qty+1} : item)}
            }else{
                return {cart : [...state.cart,{...product,qty : 1}]}
            }
          })
    },
    removeCart : (productId)=>{
        set((state)=>({
            cart : state.cart.filter(product=>product._id !== productId)
        }))
    },
    adjustQuantity : (productId,qty)=>{
        set((state)=>({
            cart : state.cart.map(product=>product._id === productId ? {...product,qty : Number(qty)} : product)
        }))
    },
    resetCart : ()=>{
        set((state)=>({
            cart : []
        }))
    },
})
const useProductStore =create(
    devtools(
        persist(createProductStore,{
            name : "product"
        })
    )
)
export default useProductStore;