import { BrowserRouter, Routes, Route } from "react-router-dom"

import DashboardLayout from "./app/layouts/DashboardLayout.jsx"

import HomePage from "./features/home/pages/HomePage.jsx"

import CategoriesPage from "./features/categories/pages/CategoriesPage.jsx"
import CategoryDetailPage from "./features/categories/pages/CategoryDetailPage.jsx"
import CategoryEditPage from "./features/categories/pages/CategoryEditPage.jsx"

import ProductsPage from "./features/products/pages/ProductsPage.jsx"
import ProductDetailPage from "./features/products/pages/ProductDetailPage.jsx"
import ProductEditPage from "./features/products/pages/ProductEditPage.jsx"

import UsersPage from "./features/users/pages/UsersPage.jsx"
import UserDetailPage from "./features/users/pages/UserDetailPage.jsx"
import UserEditPage from "./features/users/pages/UserEditPage.jsx"

import SalesPage from "./features/sales/pages/SalesPage.jsx"

import OrdersPage from "./features/orders/pages/OrdersPage.jsx"

import StaffPage from "./features/staff/pages/StaffPage.jsx"

import WorkersPage from "./features/workers/pages/WorkersPage.jsx"
import WorkerDetailPage from "./features/workers/pages/WorkerDetailPage.jsx"

import SuppliersPage from "./features/suppliers/pages/SuppliersPage.jsx"
import SupplierDetailPage from "./features/suppliers/pages/SupplierDetailPage.jsx"

import CustomersPage from "./features/customers/pages/CustomersPage.jsx"
import CustomerDetailPage from "./features/customers/pages/CustomerDetailPage.jsx"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductEditPage/>}/>
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="categories" element={<CategoriesPage/>}/>
          <Route path="categories/:id" element={<CategoryDetailPage route="categories"/>}/>
          <Route path="categories/:id/edit" element={<CategoryEditPage/>}/>
          <Route path="products" element={<ProductsPage/>}/>
          <Route path="products/:id" element={<ProductDetailPage route="products"/>}/>
          <Route path="products/:id/edit" element={<ProductEditPage/>}/>
          <Route path="users" element={<UsersPage/>}/>
          <Route path="users/:id" element={<UserDetailPage route="users"/>}/>
          <Route path="users/:id/edit" element={<UserEditPage/>}/>
          <Route path="sales" element={<SalesPage/>}/>
          <Route path="orders" element={<OrdersPage/>}/>
          <Route path="staff" element={<StaffPage/>}/>
          <Route path="customers" element={<CustomersPage/>}/>
          <Route path="customers/:id" element={<CustomerDetailPage route="customers"/>}/>
          <Route path="workers" element={<WorkersPage/>}/>
          <Route path="workers/:id" element={<WorkerDetailPage route="workers"/>}/>
          <Route path="suppliers" element={<SuppliersPage/>}/>
          <Route path="suppliers/:id" element={<SupplierDetailPage route="suppliers"/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
    
  
}

export default App
