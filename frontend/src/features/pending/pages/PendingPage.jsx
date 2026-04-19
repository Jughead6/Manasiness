import "./PendingPage.css"
import { useState, useEffect } from "react"
import PendingLayout from "../layout/PendingLayout"
import { getCustomersPending, getSuppliersPending, getWorkersPending } from "../api/pending.api"
import { userPendingMapper } from "../mappers/pending.mapper"

function PendingPage() {
    const [customers, setCustomers] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [workers, setWorkers] = useState([])

    useEffect(() => {
        async function fetchUsersPending() {
            try {
                const customers = await getCustomersPending()
                const suppliers = await getSuppliersPending()
                const workers = await getWorkersPending()

                setCustomers(userPendingMapper(customers))
                setSuppliers(userPendingMapper(suppliers))
                setWorkers(userPendingMapper(workers))
            } catch {
                setCustomers([])
                setSuppliers([])
                setWorkers([])
            }
        }
        fetchUsersPending()
    }, [])

    return (
        <PendingLayout
            title="Pending"
            description="On this page, you can view your payments pending in a more organized and straightforward way."
            customers={customers}
            suppliers={suppliers}
            workers={workers}
        />
    )
}

export default PendingPage