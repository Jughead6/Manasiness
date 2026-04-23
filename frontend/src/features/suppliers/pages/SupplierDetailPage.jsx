import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PersonLayout from "../../../shared/ui/layouts/person/PersonLayout.jsx"
import { getSupplierById } from "../api/suppliers.api.js"
import { mapSupplierToDetail, mapSuppliersTotalPage } from "../mappers/suppliers.mapper.js"

function SupplierDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [detail, setDetail] = useState(null)
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [sortOrder, setSortOrder] = useState("recent")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [dayOffset, setDayOffset] = useState(0)

    useEffect(() => {
        async function fetchSupplierDetail() {
            try {
                setHasError(false)
                setIsLoading(true)

                const response = await getSupplierById(id, {
                    sort: sortOrder,
                    page: currentPage,
                    offset: dayOffset,
                    period: "day"
                })

                setDetail(mapSupplierToDetail(response))
                setTotalPage(mapSuppliersTotalPage(response))
            } catch {
                setDetail(null)
                setTotalPage(0)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSupplierDetail()
    }, [id, sortOrder, currentPage, dayOffset])

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

    function handleOlder() {
        setDayOffset((prev) => prev + 1)
        setCurrentPage(1)
    }

    function handleNewer() {
        if (!detail?.hasNewer) {
            return
        }

        setDayOffset((prev) => prev - 1)
        setCurrentPage(1)
    }

    if (hasError || !detail && !isLoading) {
        return (
            <div>
                <h2>Could not load supplier</h2>
                <button onClick={() => navigate("/dashboard/suppliers")}>Back</button>
            </div>
        )
    }

    return (
        <PersonLayout
            title="Supplier"
            name={detail?.name || ""}
            data={detail?.details || []}
            columns={["Date", "Product", "Price", "Quantity", "State"]}
            sectionTitle="Orders"
            filterValue={sortOrder}
            onFilterChange={handleFilterChange}
            windowLabel={detail?.windowLabel || ""}
            hasOlder={detail?.hasOlder}
            hasNewer={detail?.hasNewer}
            onOlder={handleOlder}
            onNewer={handleNewer}
            currentPage={currentPage}
            totalPage={totalPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
            isLoading={isLoading}
            emptyMessage="No orders found in this date."
        />
    )
}

export default SupplierDetailPage
