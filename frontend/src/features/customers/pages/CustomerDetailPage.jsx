import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PersonLayout from "../../../shared/ui/layouts/person/PersonLayout.jsx"
import { getCustomerById } from "../api/customers.api.js"
import { mapCustomerToDetail, mapCustomersTotalPage } from "../mappers/customers.mapper.js"

function CustomerDetailPage() {
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
        async function fetchCustomerDetail() {
            try {
                setHasError(false)
                setIsLoading(true)

                const response = await getCustomerById(id, {
                    sort: sortOrder,
                    page: currentPage,
                    offset: dayOffset,
                    period: "day"
                })

                setDetail(mapCustomerToDetail(response))
                setTotalPage(mapCustomersTotalPage(response))
            } catch {
                setDetail(null)
                setTotalPage(0)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCustomerDetail()
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
                <h2>Could not load customer</h2>
                <button onClick={() => navigate("/dashboard/customers")}>Back</button>
            </div>
        )
    }

    return (
        <PersonLayout
            title="Customer"
            name={detail?.name || ""}
            data={detail?.details || []}
            columns={["Date", "Product", "Price", "Quantity", "State"]}
            sectionTitle="Sales"
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
            emptyMessage="No sales found in this date."
        />
    )
}

export default CustomerDetailPage
