import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import TableLayout from "../../../shared/ui/layouts/table/TableLayout.jsx"
import { getOrders, registerOrders } from "../api/orders.api.js"
import { mapOrdersToTables } from "../mappers/orders.mapper.js"
import OrderRegisterModal from "../components/OrderRegisterModal.jsx"

function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen ] = useState(false)
    const [sortOrder, setSortOrder] = useState('recent')

    const ordersColumns = [
        { key: 'date', label: 'Date' },
        { key: 'product', label: 'Product' },
        { key: 'supplier', label: 'Supplier' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'state', label: 'State' }
    ]

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await getOrders(sortOrder)
                setOrders(mapOrdersToTables(response))
            } catch (error) {
                console.log(error)
            } 
        } 
        fetchOrders()
    }, [sortOrder])

    function handleFilterChange(e) {
        setSortOrder(e.target.value)
    }

    async function handleSubmit(formData) {
        try {
            const result = await registerOrders(formData)
            console.log(result)
            const response = await getOrders(sortOrder)
            setOrders(mapOrdersToTables(response))
            setIsRegisterModalOpen(false)
            toast.success("Order created successfully")  
        } catch (error) {
            console.log(error)
            toast.error("The order could not be created")
        }
    }
    

    return (
        <>
            <PageTitle 
                title="Your Orders" 
                subtitle="In this section you can view your orders record."
            />
            <TableLayout 
                data={orders} 
                columns={ordersColumns} 
                onCreateClick={() => setIsRegisterModalOpen(true)}
                filterValue={sortOrder}
                onFilterChange={handleFilterChange}
            />
            {isRegisterModalOpen && <OrderRegisterModal 
                onClose={() => setIsRegisterModalOpen(false)} 
                onCreate={handleSubmit}
            />}
        </>
    )
}

export default OrdersPage