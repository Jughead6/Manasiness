

import { useEffect, useState } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import TableLayout from '../../../shared/ui/layouts/table/TableLayout.jsx'

import { getOrders } from '../api/orders.api.js'
import { mapOrdersToTables } from '../mappers/orders.mapper.js'

import OrderRegisterModal from '../components/OrderRegisterModal.jsx'

function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen ] = useState(false)

    const ordersColumns = [
        { key: 'date', label: 'Date' },
        { key: 'product', label: 'Product' },
        { key: 'customer', label: 'Customer' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'state', label: 'State' }
    ]

    useEffect(() => {
        getOrders().then((data) => {
            setOrders(mapOrdersToTables(data))
        })
    }, [])

    return (
        <>
            <PageTitle title="Your Orders" subtitle="In this section you can view your orders record."/>
            <TableLayout data={orders} columns={ordersColumns} onCreateClick={() => setIsRegisterModalOpen(true)}/>
            {isRegisterModalOpen && <OrderRegisterModal onClose={() => setIsRegisterModalOpen(false)} />}
        </>
    )
}

export default OrdersPage