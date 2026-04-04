import './DashboardLayout.css'
import DashboardSidebar from '../navigation/DashboardSidebar'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
    return (
        <div id="dashboardlayout">
            <div id="dashboardlayout-sidebar">
                <DashboardSidebar />
            </div>
            <div id="dashboardlayout-content">
                <div className="dashboardlayout-page">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout