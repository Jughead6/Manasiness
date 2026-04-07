import { useState, useEffect } from "react"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { getSuppliers } from "../api/suppliers.api.js"
import { mapSuppliersToCards } from "../mappers/suppliers.mapper.js"

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        async function fetchSuppliers() {
            try {
                const response = await getSuppliers()
                setSuppliers(mapSuppliersToCards(response))
            } catch (error) {
                console.log(error)
            }
        }
        fetchSuppliers()
    }, [])

    return (
        <>
            <PageTitle  
                title="Your Suppliers" 
                subtitle="In this section you can view your suppliers"
            />
            <CardLayout 
                data={suppliers} 
                action="Suppliers" 
                route="suppliers"
            />
        </>
    )
}

export default SuppliersPage
