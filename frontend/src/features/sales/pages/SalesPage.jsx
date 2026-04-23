import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import TableLayout from "../../../shared/ui/layouts/table/TableLayout.jsx"
import { getSales, registerSales } from "../api/sales.api.js"
import { mapSalesToTables, mapSalesTotalPage, mapSalesWindowState } from "../mappers/sales.mapper.js"
import SaleRegisterModal from "../components/SaleRegisterModal.jsx"

function SalesPage() {
    const [sales, setSales] = useState([])
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

    const salesColumns = [
        { key: "date", label: "Date" },
        { key: "product", label: "Product" },
        { key: "customer", label: "Customer" },
        { key: "price", label: "Price" },
        { key: "quantity", label: "Quantity" },
        { key: "state", label: "State" }
    ]

    const fetchSales = useCallback(async ({ nextSort = sortOrder, nextPage = currentPage, nextDayOffset = dayOffset } = {}) => {
        try {
            setIsLoading(true)
            const response = await getSales({ sort: nextSort, page: nextPage, offset: nextDayOffset, period: "day" })
            const windowState = mapSalesWindowState(response)

            setSales(mapSalesToTables(response))
            setTotalPage(mapSalesTotalPage(response))
            setWindowLabel(windowState.label)
            setHasOlder(windowState.hasOlder)
            setHasNewer(windowState.hasNewer)
        } catch (error) {
            setSales([])
            setTotalPage(0)
            setWindowLabel("")
            setHasOlder(false)
            setHasNewer(false)
            toast.error(error.message || "Could not load sales")
        } finally {
            setIsLoading(false)
        }
    }, [sortOrder, currentPage, dayOffset])

    useEffect(() => {
        fetchSales()
    }, [fetchSales])

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
            await registerSales(formData)
            setSortOrder("recent")
            setDayOffset(0)
            setCurrentPage(1)
            await fetchSales({ nextSort: "recent", nextPage: 1, nextDayOffset: 0 })
            setIsRegisterModalOpen(false)
            toast.success("Sale created successfully")
        } catch (error) {
            toast.error(error.message || "The sale could not be created")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <TableLayout
                title="Your Sales"
                subtitle="In this section you can view your sales record."
                data={sales}
                columns={salesColumns}
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
                emptyMessage="No sales found for this day."
            />
            {isRegisterModalOpen && <SaleRegisterModal onClose={() => setIsRegisterModalOpen(false)} onCreate={handleSubmit} isSubmitting={isSubmitting} />}
        </>
    )
}

export default SalesPage
