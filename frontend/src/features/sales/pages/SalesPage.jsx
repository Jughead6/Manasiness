import { useEffect, useState } from "react"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import TableLayout from "../../../shared/ui/layouts/table/TableLayout.jsx"
import { getSales, registerSales } from "../api/sales.api.js"
import { mapSalesToTables } from "../mappers/sales.mapper.js"
import SaleRegisterModal from "../components/SaleRegisterModal.jsx"

function SalesPage() {
    const [sales, setSales] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    const salesColumns = [
        { key: 'date', label: 'Date' },
        { key: 'product', label: 'Product' },
        { key: 'customer', label: 'Customer' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'state', label: 'State' }
    ]

    useEffect(() => {
        async function fetchSales() {
            try {
                const response = await getSales()
                setSales(mapSalesToTables(response))
            } catch (error) {
                console.log(error)
            } 
        } 
        fetchSales()
    }, [])

    async function handleSubmit(formData) {
        try {
            const result = await registerSales(formData)
            console.log(result)
            const response = await getSales()
            setSales(mapSalesToTables(response))
            setIsRegisterModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <PageTitle 
                title="Your Sales" 
                subtitle="In this section you can view your sales record."
            />
            <TableLayout 
                data={sales} 
                columns={salesColumns} 
                onCreateClick={() => setIsRegisterModalOpen(true)}
            />
            {isRegisterModalOpen && <SaleRegisterModal 
                onClose={() => setIsRegisterModalOpen(false)} 
                onCreate={handleSubmit}
            />}  
        </>
    )
}

export default SalesPage