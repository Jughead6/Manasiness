import "./PendingPage.css"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import PendingLayout from "../layout/PendingLayout"
import { getPendingSummary, getCustomersPending, getSuppliersPending, getWorkersPending, updatePendingState } from "../api/pending.api"
import { userPendingMapper, pendingSummaryMapper } from "../mappers/pending.mapper"

function createEmptySummary() {
    return {
        customers: { count: 0, total: 0 },
        suppliers: { count: 0, total: 0 },
        workers: { count: 0, total: 0 },
        global: { count: 0, total: 0 }
    }
}

function PendingPage() {
    const [customers, setCustomers] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [workers, setWorkers] = useState([])
    const [summary, setSummary] = useState(createEmptySummary())
    const [isLoading, setIsLoading] = useState(true)
    const [submittingKey, setSubmittingKey] = useState("")

    async function fetchUsersPending() {
        try {
            setIsLoading(true)

            const [summaryData, customersData, suppliersData, workersData] = await Promise.all([
                getPendingSummary(),
                getCustomersPending(),
                getSuppliersPending(),
                getWorkersPending()
            ])

            setSummary(pendingSummaryMapper(summaryData))
            setCustomers(userPendingMapper(customersData))
            setSuppliers(userPendingMapper(suppliersData))
            setWorkers(userPendingMapper(workersData))
        } catch {
            setSummary(createEmptySummary())
            setCustomers([])
            setSuppliers([])
            setWorkers([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsersPending()
    }, [])

    async function handleResolve(scope, id, state) {
        const nextSubmittingKey = `${scope}-${id}-${state}`

        try {
            setSubmittingKey(nextSubmittingKey)
            await updatePendingState(scope, id, state)
            await fetchUsersPending()
            toast.success("Pending updated successfully")
        } catch (error) {
            toast.error(error.message || "Pending could not be updated")
        } finally {
            setSubmittingKey("")
        }
    }

    return (
        <PendingLayout
            title="Pending"
            description="On this page, you can review your pending records, check the pending amount by section, and resolve each record without leaving the stats area."
            customers={customers}
            suppliers={suppliers}
            workers={workers}
            summary={summary}
            isLoading={isLoading}
            onResolve={handleResolve}
            submittingKey={submittingKey}
        />
    )
}

export default PendingPage
