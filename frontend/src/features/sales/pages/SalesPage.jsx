import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import TableLayout from "../../../shared/ui/layouts/table/TableLayout.jsx"
import { getSales, registerSales } from "../api/sales.api.js"
import { mapSalesToTables, mapSalesTotalPage } from "../mappers/sales.mapper.js"
import SaleRegisterModal from "../components/SaleRegisterModal.jsx"

function SalesPage() {
    const [sales, setSales] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState("recent")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const salesColumns = [
        { key: "date", label: "Date" },
        { key: "product", label: "Product" },
        { key: "customer", label: "Customer" },
        { key: "price", label: "Price" },
        { key: "quantity", label: "Quantity" },
        { key: "state", label: "State" }
    ]

    useEffect(() => {
        async function fetchSales() {
            try {
                const response = await getSales(sortOrder, currentPage)
                setSales(mapSalesToTables(response))
                setTotalPage(mapSalesTotalPage(response))
            } catch {
                setSales([])
                setTotalPage(0)
            }
        }

        fetchSales()
    }, [sortOrder, currentPage])

    function handleFilterChange(e) {
        setSortOrder(e.target.value)
        setCurrentPage(1)
    }

    function handleNextPage() {
        setCurrentPage((prev) => prev + 1)
    }

    function handlePrevPage() {
        setCurrentPage((prev) => prev - 1)
    }

    async function handleSubmit(formData) {
        try {
            await registerSales(formData)
            const response = await getSales(sortOrder, currentPage)
            setSales(mapSalesToTables(response))
            setTotalPage(mapSalesTotalPage(response))
            setIsRegisterModalOpen(false)
            toast.success("Sale created successfully")
        } catch {
            toast.error("The sale could not be created")
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
                currentPage={currentPage}
                totalPage={totalPage}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />
            {isRegisterModalOpen && <SaleRegisterModal 
                onClose={() => setIsRegisterModalOpen(false)} 
                onCreate={handleSubmit}
            />}
        </>
    )
}

export default SalesPage