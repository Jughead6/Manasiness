import { TableOfContents, PackageSearch, Contact, BadgeDollarSign, FileUser, Pickaxe, ChartColumnDecreasing, PillBottle, LockKeyhole } from "lucide-react"
import { NavLink } from 'react-router-dom'
import './dashboard.css'

import Home from '../../dashboard/home/home.jsx'

import Categories from '../../../pages/actions/categories/categories.jsx';
import Products from '../../../pages/actions/products/products.jsx';
import Users from '../../../pages/actions/users/Users.jsx'

import Sales from '../../../pages/yourspace/sales/Sales.jsx';
import Customers from '../../../pages/yourspace/customers/Customers.jsx';

import Workers from '../../../pages/admin/workers/Workers.jsx';
import Statistics from '../../../pages/admin/statistics/statistics.jsx';
import Suppliers from '../../../pages/admin/suppliers/Suppliers.jsx';
import Password from '../../../pages/admin/password/Password.jsx';

function Dashboard() {
    return (
        <div id='dashboard'>
            <div>
                <h2 id="dashboard-manasiness">Manasiness</h2>
            </div>
            <div id="dashboard-list">
                <ul>
                    <li className='dashboard-sublists'>
                        <h3 className='dashboard-category'>ACTIONS</h3>
                        <ul>
                            <li>
                                <NavLink to="/dashboard/categories" className='dashboard-subcategory'>
                                    <TableOfContents className='dashboard-icon'/>
                                    Categories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/products" className='dashboard-subcategory'>
                                    <PackageSearch className='dashboard-icon'/>
                                    Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users" className='dashboard-subcategory'>
                                    <Contact className='dashboard-icon'/>
                                    Users
                                </NavLink>
                            </li>
                        </ul> 
                    </li>                       

                    
                    <li className='dashboard-sublists'>
                        <h3 className='dashboard-category'>YOUR SPACE</h3>
                        <ul>
                            <li>
                                <NavLink to="/dashboard/sales" className='dashboard-subcategory'>
                                    <BadgeDollarSign className='dashboard-icon'/>
                                    Sales
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/customers" className='dashboard-subcategory'>
                                    <FileUser className='dashboard-icon'/>
                                    Customers
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    
                    <li className='dashboard-sublists'> 
                        <h3 className='dashboard-category'>ADMIN</h3>
                        <ul>
                            <li>
                                <NavLink to="/dashboard/workers" className='dashboard-subcategory'>
                                    <FileUser className='dashboard-icon'/>
                                    Workers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/statistics" className='dashboard-subcategory'>
                                    <ChartColumnDecreasing className='dashboard-icon'/>
                                    Statistics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/suppliers" className='dashboard-subcategory'>
                                    <PillBottle className='dashboard-icon'/>
                                    WoSuppliersrkers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/password" className='dashboard-subcategory'>
                                    <LockKeyhole className='dashboard-icon'/>
                                    Password
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>   
            </div>
        </div>
    )
}

export default Dashboard