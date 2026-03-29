import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login.jsx';
import DashboardLayout from './components/public/dashboardLayout/dashboardLayout.jsx';

import Home from './components/dashboard/home/home.jsx'

import Categories from './pages/actions/categories/categories.jsx';
import Products from './pages/actions/products/products.jsx';
import Users from './pages/actions/users/Users.jsx'

import Sales from './pages/yourspace/sales/Sales.jsx';
import Customers from './pages/yourspace/customers/Customers.jsx';

import Workers from './pages/admin/workers/Workers.jsx';
import Statistics from './pages/admin/statistics/statistics.jsx';
import Suppliers from './pages/admin/suppliers/Suppliers.jsx';
import Password from './pages/admin/password/Password.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="sales" element={<Sales />} />
          <Route path="customers" element={<Customers />} />
          <Route path="workers" element={<Workers />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="password" element={<Password />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
    
  
}

export default App
