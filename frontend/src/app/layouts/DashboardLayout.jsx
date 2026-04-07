import "./DashboardLayout.css"
import DashboardSidebar from "../navigation/DashboardSidebar"
import { Outlet } from "react-router-dom"

function DashboardLayout() {
    return (
        <div className="dashboard-layout">
            <div className="dashboard-layout-sidebar">
                <DashboardSidebar />
            </div>

            <div className="dashboard-layout-content">
                <div className="dashboard-layout-page">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout