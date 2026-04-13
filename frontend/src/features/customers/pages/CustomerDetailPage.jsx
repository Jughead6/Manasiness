import { useParams, useNavigate  } from "react-router-dom"
import { useEffect, useState } from "react"
import PersonTitle from "../../../shared/ui/titles/person/PersonTitle.jsx"
import PersonLayout from "../../../shared/ui/layouts/person/PersonLayout.jsx"
import { getCustomerById } from "../api/customers.api.js"
import { mapCustomerToDetail, mapTotalPage } from "../mappers/customers.mapper.js"

function CustomerDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [detail, setDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [sortOrder, setSortOrder] = useState("recent")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        async function fetchCustomerDetail() {
            try {
                setIsLoading(true)
                setHasError(false)
                const response = await getCustomerById(id, sortOrder, currentPage)
                setDetail(mapCustomerToDetail(response))
                setTotalPage(mapTotalPage(response))
            } catch {
                setDetail(null)
                setTotalPage(0)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCustomerDetail()
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
        return <div>Loading customer...</div>
    }

    if (hasError || !detail) {
        return (
            <div>
                <h2>Could not load customer</h2>
                <button onClick={() => navigate("/dashboard/customers")}>Back</button>
            </div>
        )
    }


    return (
        <>
            <PersonTitle title="Customer" name={detail.name} />
            <PersonLayout
                data={detail.details}
                columns={["Date", "Product", "Price", "Quantity", "State"]}
                sectionTitle="Sales"
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

export default CustomerDetailPage