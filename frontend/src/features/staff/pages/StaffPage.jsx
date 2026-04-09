import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import TableLayout from "../../../shared/ui/layouts/table/TableLayout.jsx"
import { getStaff, registerStaff } from "../api/staff.api.js"
import { mapStaffToTables } from "../mappers/staff.mapper.js"
import StaffRegisterModal from "../components/StaffRegisterModal.jsx"

function StaffPage() {
    const [staff, setStaff] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState('recent')

    const staffColumns = [
        { key: 'date', label: 'Date' },
        { key: 'worker', label: 'Worker' },
        { key: 'salary', label: 'Salary' },
        { key: 'state', label: 'State' }
    ]
    
    useEffect(() => {
        async function fetchStaff() {
            try {
                const response = await getStaff(sortOrder)
                setStaff(mapStaffToTables(response))
            } catch (error) {
                console.log(error)
            } 
        } 
        fetchStaff()
    }, [sortOrder])

    function handleFilterChange(e) {
        setSortOrder(e.target.value)
    }

    async function handleSubmit(formData) {
        try {
            const result = await registerStaff(formData)
            console.log(result)
            const response = await getStaff(sortOrder)
            setStaff(mapStaffToTables(response))
            setIsRegisterModalOpen(false)
            toast.success("The staff record could not be created")  
        } catch (error) {
            console.log(error)
            toast.error("Product could not be created")
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
            />
            {isRegisterModalOpen && <StaffRegisterModal 
                onClose={() => setIsRegisterModalOpen(false)} 
                onCreate={handleSubmit}
            />}
        </>
    )
}

export default StaffPage