import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import useDebouncedValue from "../../../shared/hooks/useDebouncedValue.js"
import { getSuppliers } from "../api/suppliers.api.js"
import { mapSuppliersToCards } from "../mappers/suppliers.mapper.js"

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchInput, setSearchInput] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const searchTerm = useDebouncedValue(searchInput)

    useEffect(() => {
        async function fetchSuppliers() {
            setIsLoading(true)

            try {
                const response = await getSuppliers({ search: searchTerm, status: statusFilter })
                setSuppliers(mapSuppliersToCards(response))
            } catch (error) {
                setSuppliers([])
                toast.error(error.message || "Could not load suppliers")
            } finally {
                setIsLoading(false)
            }
        }

        fetchSuppliers()
    }, [searchTerm, statusFilter])

    function handleSearchChange(e) {
        setSearchInput(e.target.value)
    }

    function handleStatusChange(e) {
        setStatusFilter(e.target.value)
    }

    return (
        <CardLayout
            title="Your Suppliers"
            subtitle="In this section you can view your suppliers"
            data={suppliers}
            action="Suppliers"
            route="suppliers"
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
            resultsCount={suppliers.length}
            emptyMessage="No suppliers match the current search"
            isLoading={isLoading}
        />
    )
}

export default SuppliersPage
