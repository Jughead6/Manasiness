import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import TableLayout from "../../../shared/ui/layouts/table/TableLayout.jsx"
import { getStaff, registerStaff } from "../api/staff.api.js"
import { mapStaffToTables, mapStaffTotalPage } from "../mappers/staff.mapper.js"
import StaffRegisterModal from "../components/StaffRegisterModal.jsx"

function StaffPage() {
    const [staff, setStaff] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState("recent")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const staffColumns = [
        { key: "date", label: "Date" },
        { key: "worker", label: "Worker" },
        { key: "salary", label: "Salary" },
        { key: "state", label: "State" }
    ]
    
    useEffect(() => {
        async function fetchStaff() {
            try {
                const response = await getStaff(sortOrder, currentPage)
                setStaff(mapStaffToTables(response))
                setTotalPage(mapStaffTotalPage(response))
            } catch {
                setStaff(null)
                setTotalPage(null)
            }
        }

        fetchStaff()
    }, [sortOrder, currentPage])

    function handleFilterChange(e) {
        setSortOrder(e.target.value)
        setCurrentPage(1)
    }

    function handleNextPage() {
        setCurrentPage((prev) => prev + 1)
    }

    function handlePrevPage() {
        setCurrentPage((prev) => prev - 1)
    }

    async function handleSubmit(formData) {
        try {
            await registerStaff(formData)
            const response = await getStaff(sortOrder, currentPage)
            setStaff(mapStaffToTables(response))
            setTotalPage(mapStaffTotalPage(response))
            setIsRegisterModalOpen(false)
            toast.success("The staff record was created successfully.")
        } catch {
            toast.error("The staff record could not be created")
        }
    }

    return (
        <>
            <PageTitle 
                title="Your Staff" 
                subtitle="In this section you can view your staff record."
            />
            <TableLayout 
                data={staff} 
                columns={staffColumns} 
                onCreateClick={() => setIsRegisterModalOpen(true)}
                filterValue={sortOrder}
                onFilterChange={handleFilterChange}
                currentPage={currentPage}
                totalPage={totalPage}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />
            {isRegisterModalOpen && <StaffRegisterModal 
                onClose={() => setIsRegisterModalOpen(false)} 
                onCreate={handleSubmit}
            />}
        </>
    )
}

export default StaffPage