import '../pages.css'
import { useEffect, useState } from 'react'

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutTable from '../../components/public/layout/table/layouttable.jsx'
import { getOrders } from '../../components/content/yourspace/orderscontent'

function Orders() {
    const [orders, setOrders] = useState([])

    const ordersColumns = [
        { key: 'date', label: 'Date' },
        { key: 'product', label: 'Product' },
        { key: 'customer', label: 'Customer' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'state', label: 'State' }
    ]

    useEffect(() => {
        async function loadOrders() {
            const result = await getOrders()
            setOrders(result)
        }

        loadOrders()
    }, [])

    return (
        <div className="page">
            <PageTitle  title="Your Orders" subtitle="In this section you can view your orders record."/>
            <LayoutTable data={orders} columns={ordersColumns} />
        </div>
    )
}

export default Orders