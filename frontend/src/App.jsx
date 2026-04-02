import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login/Login.jsx';
import DashboardLayout from './components/dashboard/dashboardLayout/dashboardLayout.jsx';

import Home from './components/dashboard/home/home.jsx'

import Categories from './pages/actions/Categories.jsx'
import Products from './pages/actions/products.jsx';
import Users from './pages/actions/Users.jsx'

import Sales from './pages/yourspace/Sales.jsx';
import Orders from './pages/yourspace/Orders.jsx';
import Staff from './pages/yourspace/Staff.jsx'

import Workers from './pages/users/Workers.jsx';
import Suppliers from './pages/users/Suppliers.jsx';
import Customers from './pages/users/Customers.jsx'

import Password from './pages/admin/password/Password.jsx'

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
          <Route path="orders" element={<Orders />} />
          <Route path="staff" element={<Staff />} />
          <Route path="customers" element={<Customers />} />
          <Route path="workers" element={<Workers />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="password" element={<Password />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
    
  
}

export default App
