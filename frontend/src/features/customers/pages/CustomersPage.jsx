import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { getCustomers } from "../api/customers.api.js"
import { mapCustomersToCards } from "../mappers/customers.mapper.js"

function CustomersPage() {
    const [customers, setCustomers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await getCustomers(searchTerm)
                setCustomers(mapCustomersToCards(response))
            } catch {
                toast.error("Could not load customers")
            }
        }
        fetchCustomers()
    }, [searchTerm])

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <PageTitle  
                title="Your Customers" 
                subtitle="In this section you can view your customers"
            />
            <CardLayout 
                data={customers} 
                action="Customers" 
                route="customers"
                searchValue={searchTerm}
                onSearchChange={handleSearchChange}
            />
        </>
    )
}

export default CustomersPage