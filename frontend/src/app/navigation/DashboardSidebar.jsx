import "./DashboardSidebar.css"
import { useState } from "react"
import { TableOfContents, PackageSearch, Menu, User, BadgeDollarSign, FileUser, ChartColumnDecreasing, PillBottle, BriefcaseBusiness } from "lucide-react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../features/auth/context/AuthContext.jsx"

function DashboardSidebar() {
    const navigate = useNavigate()
    const { store, logoutSession } = useAuth()
    const [openSections, setOpenSections] = useState({
        actions: false,
        yourspace: false,
        users: false
    })

    async function handleLogout() {
        await logoutSession()
        navigate("/login", { replace: true })
    }

    function handleSection(section) {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    return (
        <div className="dashboard-sidebar">
            <div className="dashboard-sidebar-brand-wrapper">
                <Link to="/dashboard" className="dashboard-sidebar-brand">
                    <h2>Manasiness</h2>
                </Link>
            </div>

            <div className="dashboard-sidebar-list">
                <div className="dashboard-sidebar-section">
                    <button onClick={() => handleSection("actions")}>Actions <Menu /></button>
                    <ul hidden={!openSections.actions}>
                        <li><NavLink to="/dashboard/categories"><TableOfContents />Categories</NavLink></li>
                        <li><NavLink to="/dashboard/products"><PackageSearch />Products</NavLink></li>
                        <li><NavLink to="/dashboard/users"><User />Users</NavLink></li>
                    </ul>
                </div>

                <div className="dashboard-sidebar-section">
                    <button onClick={() => handleSection("yourspace")}>YOUR SPACE <Menu /></button>
                    <ul hidden={!openSections.yourspace}>
                        <li><NavLink to="/dashboard/sales"><BadgeDollarSign />Sales</NavLink></li>
                        <li><NavLink to="/dashboard/orders"><ChartColumnDecreasing />Orders</NavLink></li>
                        <li><NavLink to="/dashboard/staff"><FileUser />Staff</NavLink></li>
                    </ul>
                </div>

                <div className="dashboard-sidebar-section">
                    <button onClick={() => handleSection("users")}>USERS <Menu /></button>
                    <ul hidden={!openSections.users}>
                        <li><NavLink to="/dashboard/customers"><FileUser />Customers</NavLink></li>
                        <li><NavLink to="/dashboard/suppliers"><PillBottle />Suppliers</NavLink></li>
                        <li><NavLink to="/dashboard/workers"><BriefcaseBusiness />Workers</NavLink></li>
                    </ul>
                </div>

                <div className="dashboard-sidebar-logout">
                    <div className="dashboard-sidebar-profile">
                        <img src={store?.image || ""} alt="user perfil" />
                        <p>{store?.name || ""}</p>
                    </div>
                    <button className="dashboard-sidebar-logout-button" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default DashboardSidebar