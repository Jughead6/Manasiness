import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import TableLayout from "../../../shared/ui/layouts/table/TableLayout.jsx"
import { useAuth } from "../../auth/context/useAuth.js"
import { getOrders, registerOrders } from "../api/orders.api.js"
import { mapOrdersToTables, mapOrdersTotalPage, mapOrdersWindowState } from "../mappers/orders.mapper.js"
import OrderRegisterModal from "../components/OrderRegisterModal.jsx"

function OrdersPage() {
    const { store } = useAuth()
    const currencyCode = store?.currency_code || "PEN"
    const [orders, setOrders] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [sortOrder, setSortOrder] = useState("recent")
    const [dayOffset, setDayOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [windowLabel, setWindowLabel] = useState("")
    const [hasOlder, setHasOlder] = useState(false)
    const [hasNewer, setHasNewer] = useState(false)

    const ordersColumns = [
        { key: "date", label: "Date" },
        { key: "product", label: "Product" },
        { key: "supplier", label: "Supplier" },
        { key: "price", label: "Price" },
        { key: "quantity", label: "Quantity" },
        { key: "state", label: "State" }
    ]

    const fetchOrders = useCallback(async ({ nextSort = sortOrder, nextPage = currentPage, nextDayOffset = dayOffset } = {}) => {
        try {
            setIsLoading(true)
            const response = await getOrders({ sort: nextSort, page: nextPage, offset: nextDayOffset, period: "day" })
            const windowState = mapOrdersWindowState(response)

            setOrders(mapOrdersToTables(response, currencyCode))
            setTotalPage(mapOrdersTotalPage(response))
            setWindowLabel(windowState.label)
            setHasOlder(windowState.hasOlder)
            setHasNewer(windowState.hasNewer)
        } catch (error) {
            setOrders([])
            setTotalPage(0)
            setWindowLabel("")
            setHasOlder(false)
            setHasNewer(false)
            toast.error(error.message || "Could not load orders")
        } finally {
            setIsLoading(false)
        }
    }, [sortOrder, currentPage, dayOffset, currencyCode])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    function handleFilterChange(e) {
        setSortOrder(e.target.value)
        setCurrentPage(1)
    }

    function handleOlder() {
        setDayOffset((prev) => prev + 1)
        setCurrentPage(1)
    }

    function handleNewer() {
        if (!hasNewer) return
        setDayOffset((prev) => prev - 1)
        setCurrentPage(1)
    }

    function handleNextPage() {
        setCurrentPage((prev) => prev + 1)
    }

    function handlePrevPage() {
        setCurrentPage((prev) => prev - 1)
    }

    async function handleSubmit(formData) {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)
            await registerOrders(formData)
            setSortOrder("recent")
            setDayOffset(0)
            setCurrentPage(1)
            await fetchOrders({ nextSort: "recent", nextPage: 1, nextDayOffset: 0 })
            setIsRegisterModalOpen(false)
            toast.success("Order created successfully")
        } catch (error) {
            toast.error(error.message || "The order could not be created")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <TableLayout
                title="Your Orders"
                subtitle="In this section you can view your orders record."
                data={orders}
                columns={ordersColumns}
                onCreateClick={() => setIsRegisterModalOpen(true)}
                filterValue={sortOrder}
                onFilterChange={handleFilterChange}
                windowLabel={windowLabel}
                hasOlder={hasOlder}
                hasNewer={hasNewer}
                onOlder={handleOlder}
                onNewer={handleNewer}
                currentPage={currentPage}
                totalPage={totalPage}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                isLoading={isLoading}
                emptyMessage="No orders found for this day."
            />
            {isRegisterModalOpen && <OrderRegisterModal onClose={() => setIsRegisterModalOpen(false)} onCreate={handleSubmit} isSubmitting={isSubmitting} />}
        </>
    )
}

export default OrdersPage
