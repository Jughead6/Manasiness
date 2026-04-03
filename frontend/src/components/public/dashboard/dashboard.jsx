import { TableOfContents, PackageSearch, Contact, BadgeDollarSign, FileUser, Pickaxe, ChartColumnDecreasing, PillBottle, LockKeyhole, BriefcaseBusiness  } from "lucide-react"
import { NavLink, Link } from 'react-router-dom'
import './dashboard.css'

function Dashboard() {
    return (
        <div className='dashboard'>
            <div>
                <div>
                    <Link to="/dashboard" className="dashboard-manasiness">
                        <h2>Manasiness</h2>
                    </Link>
                </div>
            </div>
            <div className="dashboard-list">
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
                                <NavLink to="/dashboard/orders" className='dashboard-subcategory'>
                                    <ChartColumnDecreasing className='dashboard-icon'/>
                                    Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/staff" className='dashboard-subcategory'>
                                    <BriefcaseBusiness className='dashboard-icon'/>
                                    Staff
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className='dashboard-sublists'>
                        <h3 className='dashboard-category'>USERS</h3>
                        <ul>
                            <li>
                                <NavLink to="/dashboard/customers" className='dashboard-subcategory'>
                                    <FileUser className='dashboard-icon'/>
                                    Customers
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/suppliers" className='dashboard-subcategory'>
                                    <PillBottle className='dashboard-icon'/>
                                    Suppliers
                                </NavLink>
                            </li>
                                                        <li>
                                <NavLink to="/dashboard/workers" className='dashboard-subcategory'>
                                    <FileUser className='dashboard-icon'/>
                                    Workers
                                </NavLink>
                            </li>
                        </ul>
                    </li>   

                    
                    {/* <li className='dashboard-sublists'> 
                        <h3 className='dashboard-category'>ADMIN</h3>
                        <ul>



                            <li>
                                <NavLink to="/dashboard/password" className='dashboard-subcategory'>
                                    <LockKeyhole className='dashboard-icon'/>
                                    Password
                                </NavLink>
                            </li>
                        </ul>
                    </li> */}
                </ul>   
            </div>
        </div>
    )
}

export default Dashboard