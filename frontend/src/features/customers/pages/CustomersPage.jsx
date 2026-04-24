import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import useDebouncedValue from "../../../shared/hooks/useDebouncedValue.js"
import { getCustomers } from "../api/customers.api.js"
import { mapCustomersToCards } from "../mappers/customers.mapper.js"

function CustomersPage() {
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchInput, setSearchInput] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const searchTerm = useDebouncedValue(searchInput)

    useEffect(() => {
        async function fetchCustomers() {
            setIsLoading(true)

            try {
                const response = await getCustomers({ search: searchTerm, status: statusFilter })
                setCustomers(mapCustomersToCards(response))
            } catch (error) {
                setCustomers([])
                toast.error(error.message || "Could not load customers")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCustomers()
    }, [searchTerm, statusFilter])

    function handleSearchChange(e) {
        setSearchInput(e.target.value)
    }

    function handleStatusChange(e) {
        setStatusFilter(e.target.value)
    }

    return (
        <CardLayout
            title="Your Customers"
            subtitle="In this section you can view your customers"
            data={customers}
            action="Customers"
            route="customers"
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
            resultsCount={customers.length}
            emptyMessage="No customers match the current search"
            isLoading={isLoading}
        />
    )
}

export default CustomersPage
