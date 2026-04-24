import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import useDebouncedValue from "../../../shared/hooks/useDebouncedValue.js"
import { getWorkers } from "../api/workers.api.js"
import { mapWorkersToCards } from "../mappers/workers.mapper.js"

function WorkersPage() {
    const [workers, setWorkers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchInput, setSearchInput] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const searchTerm = useDebouncedValue(searchInput)

    useEffect(() => {
        async function fetchWorkers() {
            setIsLoading(true)

            try {
                const response = await getWorkers({ search: searchTerm, status: statusFilter })
                setWorkers(mapWorkersToCards(response))
            } catch (error) {
                setWorkers([])
                toast.error(error.message || "Could not load workers")
            } finally {
                setIsLoading(false)
            }
        }

        fetchWorkers()
    }, [searchTerm, statusFilter])

    function handleSearchChange(e) {
        setSearchInput(e.target.value)
    }

    function handleStatusChange(e) {
        setStatusFilter(e.target.value)
    }

    return (
        <CardLayout
            title="Your Workers"
            subtitle="In this section you can view your workers"
            data={workers}
            action="Workers"
            route="workers"
            searchValue={searchInput}
            onSearchChange={handleSearchChange}
            filterGroups={[
                {
                    key: "status",
                    label: "Status",
                    value: statusFilter,
                    onChange: handleStatusChange,
                    options: [
                        { value: "all", label: "All" },
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" }
                    ]
                }
            ]}
            resultsCount={workers.length}
            emptyMessage="No workers match the current search"
            isLoading={isLoading}
        />
    )
}

export default WorkersPage
