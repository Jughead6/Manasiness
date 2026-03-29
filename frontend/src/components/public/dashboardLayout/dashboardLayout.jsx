import './dashboardLayout.css'
import Dashboard from '../dashboard/dashboard.jsx'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
    return (
        <div id="dashboardlayout">
            <div id="dashboardlayout-sidebar">
                <Dashboard/>
            </div>
            <div id="dashboardlayout-content">
                <Outlet />
            </div>
        </div>
    )
}       

export default DashboardLayout