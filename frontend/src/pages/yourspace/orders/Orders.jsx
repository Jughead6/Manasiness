import './Orders.css'

import { useEffect, useState } from 'react'

import YourSpaceTitle from '../../../components/public/yourspace/title/yourspacetitle'
import YourSpaceLayout from '../../../components/public/yourspace/layout/yourspacelayout'
import { getOrders } from '../../../components/yourspace/orders/orderscontent'

function Orders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function loadSales() {
            const result = await getOrders()
            setOrders(result)
        }

        loadSales()
    }, [])

    return (
        <div id="sales">
            <YourSpaceTitle yourspace="Sales" />
            <YourSpaceLayout data={orders} user="customer" />
        </div>
    )
}

export default Orders

