import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PersonLayout from "../../../shared/ui/layouts/person/PersonLayout.jsx"
import { useAuth } from "../../auth/context/useAuth.js"
import { getWorkerById } from "../api/workers.api.js"
import { mapWorkersTotalPage, mapWorkerToDetail } from "../mappers/workers.mapper.js"

function WorkerDetailPage() {
    const { store } = useAuth()
    const currencyCode = store?.currency_code || "PEN"
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
        async function fetchWorkerDetail() {
            try {
                setHasError(false)
                setIsLoading(true)

                const response = await getWorkerById(id, {
                    sort: sortOrder,
                    page: currentPage,
                    offset: dayOffset,
                    period: "day"
                })

                setDetail(mapWorkerToDetail(response, currencyCode))
                setTotalPage(mapWorkersTotalPage(response))
            } catch {
                setDetail(null)
                setTotalPage(0)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchWorkerDetail()
    }, [id, sortOrder, currentPage, dayOffset, currencyCode])

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
                <h2>Could not load worker</h2>
                <button onClick={() => navigate("/dashboard/workers")}>Back</button>
            </div>
        )
    }

    return (
        <PersonLayout
            title="Worker"
            name={detail?.name || ""}
            data={detail?.details || []}
            columns={["Date", "Salary", "State"]}
            sectionTitle="Staff"
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
            emptyMessage="No staff records found in this date."
        />
    )
}

export default WorkerDetailPage
