import "./DashboardSidebar.css"
import { TableOfContents, PackageSearch, Contact, BadgeDollarSign, FileUser, ChartColumnDecreasing, PillBottle, BriefcaseBusiness } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"

function DashboardSidebar() {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("store")
        navigate("/", { replace: true })
    }
    
    return (
        
        <div className="dashboard-sidebar">
            <div className="dashboard-sidebar-brand-wrapper">
                <Link to="/dashboard" className="dashboard-sidebar-brand">
                    <h2>Manasiness</h2>
                </Link>
            </div>

            <div className="dashboard-sidebar-list">
                <ul>
                    <li className="dashboard-sidebar-group">
                        <h3 className="dashboard-sidebar-group-title">ACTIONS</h3>

                        <ul>
                            <li>
                                <NavLink to="/dashboard/categories" className="dashboard-sidebar-link">
                                    <TableOfContents className="dashboard-sidebar-icon" />
                                    Categories
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/products" className="dashboard-sidebar-link">
                                    <PackageSearch className="dashboard-sidebar-icon" />
                                    Products
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/users" className="dashboard-sidebar-link">
                                    <Contact className="dashboard-sidebar-icon" />
                                    Users
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="dashboard-sidebar-group">
                        <h3 className="dashboard-sidebar-group-title">YOUR SPACE</h3>

                        <ul>
                            <li>
                                <NavLink to="/dashboard/sales" className="dashboard-sidebar-link">
                                    <BadgeDollarSign className="dashboard-sidebar-icon" />
                                    Sales
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/orders" className="dashboard-sidebar-link">
                                    <ChartColumnDecreasing className="dashboard-sidebar-icon" />
                                    Orders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/staff" className="dashboard-sidebar-link">
                                    <BriefcaseBusiness className="dashboard-sidebar-icon" />
                                    Staff
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="dashboard-sidebar-group">
                        <h3 className="dashboard-sidebar-group-title">USERS</h3>

                        <ul>
                            <li>
                                <NavLink to="/dashboard/customers" className="dashboard-sidebar-link">
                                    <FileUser className="dashboard-sidebar-icon" />
                                    Customers
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/suppliers" className="dashboard-sidebar-link">
                                    <PillBottle className="dashboard-sidebar-icon" />
                                    Suppliers
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard/workers" className="dashboard-sidebar-link">
                                    <FileUser className="dashboard-sidebar-icon" />
                                    Workers
                                </NavLink>
                            </li>
                        </ul>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardSidebar