import { useParams, useNavigate  } from "react-router-dom"
import { useEffect, useState } from "react"
import PersonTitle from "../../../shared/ui/titles/person/PersonTitle.jsx"
import PersonLayout from "../../../shared/ui/layouts/person/PersonLayout.jsx"
import { getSupplierById } from "../api/suppliers.api.js"
import { mapSupplierToDetail, mapTotalPage } from "../mappers/suppliers.mapper.js"

function SupplierDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [detail, setDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [sortOrder, setSortOrder] = useState('recent')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        async function fetchSupplierDetail() {
            try {
                setIsLoading(true)
                setHasError(false)
                const response = await getSupplierById(id, sortOrder, currentPage)
                setDetail(mapSupplierToDetail(response))
                setTotalPage(mapTotalPage(response))
            } catch {
                setDetail(null)
                setTotalPage(0)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSupplierDetail()
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


    if (isLoading) {
        return <div>Loading supplier...</div>
    }

    if (hasError || !detail) {
        return (
            <div>
                <h2>Could not load supplier</h2>
                <button onClick={() => navigate("/dashboard/suppliers")}>Back</button>
            </div>
        )
    }


    return (
        <>
            <PersonTitle 
                title="Supplier"
                name={detail.name}
            />
            <PersonLayout
                data={detail.details}
                columns={['Date', 'Product', 'Price', 'Quantity', 'State']}
                sectionTitle="Orders"
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

export default SupplierDetailPage