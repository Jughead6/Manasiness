import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import TableLayout from "../../../shared/ui/layouts/table/TableLayout.jsx"
import { getStaff, registerStaff } from "../api/staff.api.js"
import { mapStaffToTables, mapStaffTotalPage, mapStaffWindowState } from "../mappers/staff.mapper.js"
import StaffRegisterModal from "../components/StaffRegisterModal.jsx"

function StaffPage() {
    const [staff, setStaff] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [sortOrder, setSortOrder] = useState("recent")
    const [dayOffset, setDayOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [windowLabel, setWindowLabel] = useState("")
    const [hasOlder, setHasOlder] = useState(false)
    const [hasNewer, setHasNewer] = useState(false)

    const staffColumns = [
        { key: "date", label: "Date" },
        { key: "worker", label: "Worker" },
        { key: "salary", label: "Salary" },
        { key: "state", label: "State" }
    ]

    const fetchStaff = useCallback(async ({ nextSort = sortOrder, nextPage = currentPage, nextDayOffset = dayOffset } = {}) => {
        try {
            setIsLoading(true)
            const response = await getStaff({ sort: nextSort, page: nextPage, offset: nextDayOffset, period: "day" })
            const windowState = mapStaffWindowState(response)

            setStaff(mapStaffToTables(response))
            setTotalPage(mapStaffTotalPage(response))
            setWindowLabel(windowState.label)
            setHasOlder(windowState.hasOlder)
            setHasNewer(windowState.hasNewer)
        } catch (error) {
            setStaff([])
            setTotalPage(0)
            setWindowLabel("")
            setHasOlder(false)
            setHasNewer(false)
            toast.error(error.message || "Could not load staff history")
        } finally {
            setIsLoading(false)
        }
    }, [sortOrder, currentPage, dayOffset])

    useEffect(() => {
        fetchStaff()
    }, [fetchStaff])

    function handleFilterChange(e) {
        setSortOrder(e.target.value)
        setCurrentPage(1)
    }

    function handleOlder() {
        setDayOffset((prev) => prev + 1)
        setCurrentPage(1)
    }

    function handleNewer() {
        if (!hasNewer) return
        setDayOffset((prev) => prev - 1)
        setCurrentPage(1)
    }

    function handleNextPage() {
        setCurrentPage((prev) => prev + 1)
    }

    function handlePrevPage() {
        setCurrentPage((prev) => prev - 1)
    }

    async function handleSubmit(formData) {
        if (isSubmitting) return

        try {
            setIsSubmitting(true)
            await registerStaff(formData)
            setSortOrder("recent")
            setDayOffset(0)
            setCurrentPage(1)
            await fetchStaff({ nextSort: "recent", nextPage: 1, nextDayOffset: 0 })
            setIsRegisterModalOpen(false)
            toast.success("The staff record was created successfully.")
        } catch (error) {
            toast.error(error.message || "The staff record could not be created")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <TableLayout
                title="Your Staff"
                subtitle="In this section you can view your staff record."
                data={staff}
                columns={staffColumns}
                onCreateClick={() => setIsRegisterModalOpen(true)}
                filterValue={sortOrder}
                onFilterChange={handleFilterChange}
                windowLabel={windowLabel}
                hasOlder={hasOlder}
                hasNewer={hasNewer}
                onOlder={handleOlder}
                onNewer={handleNewer}
                currentPage={currentPage}
                totalPage={totalPage}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                isLoading={isLoading}
                emptyMessage="No staff payments found for this day."
            />
            {isRegisterModalOpen && <StaffRegisterModal onClose={() => setIsRegisterModalOpen(false)} onCreate={handleSubmit} isSubmitting={isSubmitting} />}
        </>
    )
}

export default StaffPage
