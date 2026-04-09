import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import PersonTitle from "../../../shared/ui/titles/person/PersonTitle.jsx"
import PersonLayout from "../../../shared/ui/layouts/person/PersonLayout.jsx"
import { getWorkerById } from "../api/workers.api.js"
import { mapTotalPage, mapWorkerToDetail } from "../mappers/workers.mapper.js"

function WorkerDetailPage() {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)
    const [sortOrder, setSortOrder] = useState('recent')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        async function fetchWorkerDetail() {
            try {
                const response = await getWorkerById(id, sortOrder, currentPage)
                setDetail(mapWorkerToDetail(response))
                setTotalPage(mapTotalPage(response))
            } catch (error) {
                console.log(error)
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


    if (!detail) {
        return null
    }

    return (
        <>
            <PersonTitle 
                title="Worker" 
                name={detail.name}
            />
            <PersonLayout
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
        </>
    )
}

export default WorkerDetailPage