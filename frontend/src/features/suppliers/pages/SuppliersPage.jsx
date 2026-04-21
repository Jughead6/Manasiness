import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { getSuppliers } from "../api/suppliers.api.js"
import { mapSuppliersToCards } from "../mappers/suppliers.mapper.js"

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function fetchSuppliers() {
            try {
                const response = await getSuppliers(searchTerm)
                setSuppliers(mapSuppliersToCards(response))
            } catch {
                toast.error("Could not load suppliers")
            }
        }
        fetchSuppliers()
    }, [searchTerm])

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <CardLayout 
            title="Your Suppliers" 
            subtitle="In this section you can view your suppliers"
            data={suppliers} 
            action="Suppliers" 
            route="suppliers"
            searchValue={searchTerm}
            onSearchChange={handleSearchChange}
        />
    )
}

export default SuppliersPage