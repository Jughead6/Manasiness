import "./HomePage.css"
import { useState, useEffect } from "react"
import { getSalesStats, getOrdersStats, getStaffStats } from "../api/home.api.js"
import { useAuth } from "../../auth/context/useAuth.js"

function createEmptyStats() {
    return {
        dayTotal: 0,
        dayCount: 0,
        weekTotal: 0,
        weekCount: 0,
        monthTotal: 0,
        monthCount: 0
    }
}

function HomePage() {
    const { store } = useAuth()

    const [salesStats, setSalesStats] = useState(createEmptyStats())
    const [ordersStats, setOrdersStats] = useState(createEmptyStats())
    const [staffStats, setStaffStats] = useState(createEmptyStats())

    useEffect(() => {
        async function loadStats() {
            try {
                const [salesResponse, ordersResponse, staffResponse] = await Promise.all([
                    getSalesStats(),
                    getOrdersStats(),
                    getStaffStats()
                ])

                setSalesStats(salesResponse || createEmptyStats())
                setOrdersStats(ordersResponse || createEmptyStats())
                setStaffStats(staffResponse || createEmptyStats())
            } catch {
                setSalesStats(createEmptyStats())
                setOrdersStats(createEmptyStats())
                setStaffStats(createEmptyStats())
            }
        }

        loadStats()
    }, [])

    return (
        <div className="home">
            <div className="home-welcome">
                <div className="home-welcome-left">
                    <h2>Welcome to dashboard!</h2>
                    <h1 className="home-welcome-title">Hi, {store?.name || ""}</h1>
                </div>
                <div className="home-welcome-right">
                    <p className="home-welcome-description">Manasiness is a web platform that helps you manage your store. This platform offers you better organized information about your business.</p>
                </div>
            </div>

            <div className="home-stats">
                <div className="home-stats-section">
                    <div className="home-stats-section-title">
                        <p>Sales</p>
                    </div>
                    <div className="home-stats-section-information">
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Today</p>
                            <p className="home-stats-section-amount">S/ {salesStats.dayTotal}</p>
                            <p className="home-stats-section-qunatity">Total Sales: {salesStats.dayCount}</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Weekly</p>
                            <p className="home-stats-section-amount">S/ {salesStats.weekTotal}</p>
                            <p className="home-stats-section-qunatity">Total Sales: {salesStats.weekCount}</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Monthly</p>
                            <p className="home-stats-section-amount">S/ {salesStats.monthTotal}</p>
                            <p className="home-stats-section-qunatity">Total Sales: {salesStats.monthCount}</p>
                        </div>
                    </div>
                </div>

                <div className="home-stats-section">
                    <div className="home-stats-section-title">
                        <p>Orders</p>
                    </div>
                    <div className="home-stats-section-information">
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Today</p>
                            <p className="home-stats-section-amount">S/ {ordersStats.dayTotal}</p>
                            <p className="home-stats-section-qunatity">Total Orders: {ordersStats.dayCount}</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Weekly</p>
                            <p className="home-stats-section-amount">S/ {ordersStats.weekTotal}</p>
                            <p className="home-stats-section-qunatity">Total Orders: {ordersStats.weekCount}</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Monthly</p>
                            <p className="home-stats-section-amount">S/ {ordersStats.monthTotal}</p>
                            <p className="home-stats-section-qunatity">Total Orders: {ordersStats.monthCount}</p>
                        </div>
                    </div>
                </div>

                <div className="home-stats-section">
                    <div className="home-stats-section-title">
                        <p>Staff</p>
                    </div>
                    <div className="home-stats-section-information">
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Today</p>
                            <p className="home-stats-section-amount">S/ {staffStats.dayTotal}</p>
                            <p className="home-stats-section-qunatity">Total Paid: {staffStats.dayCount}</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Weekly</p>
                            <p className="home-stats-section-amount">S/ {staffStats.weekTotal}</p>
                            <p className="home-stats-section-qunatity">Total Paid: {staffStats.weekCount}</p>
                        </div>
                        <div className="home-stats-section-date">
                            <p className="home-stats-section-time">Monthly</p>
                            <p className="home-stats-section-amount">S/ {staffStats.monthTotal}</p>
                            <p className="home-stats-section-qunatity">Total Paid: {staffStats.monthCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage