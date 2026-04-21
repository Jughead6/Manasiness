import { useParams, useNavigate  } from "react-router-dom"
import { useEffect, useState } from "react"
import PersonTitle from "../../../shared/ui/titles/person/PersonTitle.jsx"
import PersonLayout from "../../../shared/ui/layouts/person/PersonLayout.jsx"
import { getWorkerById } from "../api/workers.api.js"
import { mapTotalPage, mapWorkerToDetail } from "../mappers/workers.mapper.js"

function WorkerDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [detail, setDetail] = useState(null)
    const [hasError, setHasError] = useState(false)
    const [sortOrder, setSortOrder] = useState('recent')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        async function fetchWorkerDetail() {
            try {
                setHasError(false)
                const response = await getWorkerById(id, sortOrder, currentPage)
                setDetail(mapWorkerToDetail(response))
                setTotalPage(mapTotalPage(response))
            } catch {
                setDetail(null)
                setTotalPage(0)
                setHasError(true)
            }
        }
        fetchWorkerDetail()
    }, [id, sortOrder, currentPage])

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

    if (hasError || !detail) {
        return (
            <div>
                <h2>Could not load worker</h2>
                <button onClick={() => navigate("/dashboard/workers")}>Back</button>
            </div>
        )
    }


    return (
            <PersonLayout
                title="Supplier"
                name={detail.name}
                data={detail.details}
                columns={['Date', 'Salary', 'State']}
                sectionTitle="Staff"
                filterValue={sortOrder}
                onFilterChange={handleFilterChange}
                currentPage={currentPage}
                totalPage={totalPage}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
            />
    )
}

export default WorkerDetailPage