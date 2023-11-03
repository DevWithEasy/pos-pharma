import { useRoutes } from 'react-router-dom'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Order from './pages/Order'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import New_purchase from './pages/admin/purchases/New_purchase'
import Purchase from './pages/admin/purchases/Purchase'
import New_report from './pages/admin/reports/New_report'
import Reports from './pages/admin/reports/Reports'
import Companies from './pages/companies/Companies'
import New_company from './pages/companies/New_company'
import Update_company from './pages/companies/Update_company'
import Customers from './pages/customers/Customers'
import New_customer from './pages/customers/New_customer'
import UpdateCustomer from './pages/customers/UpdateCustomer'
import Generics from './pages/generics/Generics'
import New_generic from './pages/generics/New_generic'
import Update_generic from './pages/generics/Update_generic'
import Invoice from './pages/invoices/Invoice'
import Invoices from './pages/invoices/Invoices'
import New_product from './pages/products/New_product'
import Products from './pages/products/Products'
import Update_product from './pages/products/Update_product'
import New_user from './pages/users/New_user'
import Update_user from './pages/users/Update_user'
import Users from './pages/users/Users'
import Purchases from './pages/admin/purchases/Purchases'

function App() {
  const routes= useRoutes([
    {
      path : '/',
      element : <Layout/>,
      children : [
        {
          index : true,
          element : <Home/>
        },
        {
          path : '/dashboard',
          element : <Dashboard/>
        },
        {
          path : '/order',
          element : <Order/>
        },
        {
          path : '/invoices',
          element : <Invoices/>
        },
        {
          path : '/invoice/:id',
          element : <Invoice/>
        },
        {
          path : '/product/new',
          element : <New_product/>
        },
        {
          path : '/products',
          element : <Products/>
        },
        {
          path : '/product/:id',
          element : <Update_product/>
        },
        {
          path : '/generic/new',
          element : <New_generic/>
        },
        {
          path : '/generics',
          element : <Generics/>
        },
        {
          path : '/generic/:id',
          element : <Update_generic/>
        },
        {
          path : '/company/new',
          element : <New_company/>
        },
        {
          path : '/companies',
          element : <Companies/>
        },
        {
          path : '/company/:id',
          element : <Update_company/>
        },
        {
          path : '/customer/new',
          element : <New_customer/>
        },
        {
          path : '/customers',
          element : <Customers/>
        },
        {
          path : '/customer/:id',
          element : <UpdateCustomer/>
        },
        {
          path : '/admin',
          element : <Admin/>
        },
        {
          path : '/admin/user/new',
          element : <New_user/>
        },
        {
          path : '/admin/users',
          element : <Users/>
        },
        {
          path : '/admin/user/:id',
          element : <Update_user/>
        },
        {
          path : '/admin/purchase/new',
          element : <New_purchase/>
        },
        {
          path : '/admin/purchases',
          element : <Purchases/>
        },
        {
          path : '/admin/purchase/:id',
          element : <Purchase/>
        },
        {
          path : '/admin/report/new',
          element : <New_report/>
        },
        {
          path : '/admin/reports',
          element : <Reports/>
        },
        {
          path : '/signup',
          element : <Signup/>
        },
        {
          path : '/signin',
          element : <Signin/>
        }
      ]
    }
  ])

  return routes
}

export default App
