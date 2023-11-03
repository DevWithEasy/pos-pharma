import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const createUserStore = (set)=>({
    isAuth : false,
    user : {},
    users : [],
    products : [],
    companies : [],
    generics : [],
    customers : [],
    purchases : [],
    invoices : [],
    reports : [],


    addUser : (data)=>{
        set((state)=>({
            isAuth : true,
            user : data
        }))
    },
    removeUser : ()=>{
        set((state)=>({
            isAuth : false,
            user : {},
            users : [],
            companies : [],
            generics : [],
            customers : [],
        }))
    },
    addUsers : (users)=>{
        set((state)=>({
            users : users
        }))
    },
    addProducts : (products)=>{
        set((state)=>({
            products : products
        }))
    },
    addCompanies : (companies)=>{
        set((state)=>({
            companies : companies
        }))
    },
    addGenerics : (generics)=>{
        set((state)=>({
            generics : generics
        }))
    },
    addCustomers : (customers)=>{
        set((state)=>({
            customers : customers
        }))
    },
    addPurchases : (purchases)=>{
        set((state)=>({
            purchases : purchases
        }))
    },
    addInvoices : (invoices)=>{
        set((state)=>({
            invoices : invoices
        }))
    },
    addReports : (reports)=>{
        set((state)=>({
            reports : reports
        }))
    },
    removeEntity : (path,id)=>{
        set((state)=>{
            if (path === 'product'){
                    return {products : state.products.filter(product=>product._id !== id)}
            }else if (path === 'company'){
                    return {companies : state.companies.filter(company=>company._id !== id)}
            }else if (path === 'generic'){
                return {generics : state.generics.filter(generic=>generic._id !== id)}
            } else if (path === 'report'){
                return {reports : state.reports.filter(report=>report._id !== id)}
            }else if (path === 'purchase'){
                return {purchases : state.purchases.filter(purchase=>purchase._id !== id)}
            }else if (path === 'invoice'){
                return {invoices : state.invoices.filter(invoice=>invoice._id !== id)}
            }else if (path === 'customer'){
                return {customers : state.customers.filter(customer=>customer._id !== id)}
            }else if (path === 'auth'){
                return {users : state.users.filter(user=>user._id !== id)}
            }
        })
    }
})
const useUserStore =create(
    devtools(
        persist(createUserStore,{
            name : "user"
        })
    )
)
export default useUserStore;