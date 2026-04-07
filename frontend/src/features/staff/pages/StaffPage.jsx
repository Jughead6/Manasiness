import { useEffect, useState } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import TableLayout from '../../../shared/ui/layouts/table/TableLayout.jsx'

import { getStaff, postStaff } from '../api/staff.api.js'
import { mapStaffToTables } from '../mappers/staff.mapper.js'

import StaffRegisterModal from '../components/StaffRegisterModal.jsx'

function StaffPage() {
    const [staff, setStaff] = useState([])
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    const staffColumns = [
        { key: 'date', label: 'Date' },
        { key: 'worker', label: 'Worker' },
        { key: 'salary', label: 'Salary' },
        { key: 'state', label: 'State' }
    ]
    
    useEffect(() => {
        async function fetchStaff() {
            try {
                const response = await getStaff()
                setStaff(mapStaffToTables(response))
            } catch (error) {
                console.log(error)
            } 
        } 
        fetchStaff()
    }, [])

    async function handleSubmit(formData) {
        try {
            const result = await postStaff(formData)
            console.log(result)
            const response = await getStaff()
            setStaff(mapStaffToTables(response))
            setIsRegisterModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <PageTitle title="Your Staff" subtitle="In this section you can view your staff record."/>
            <TableLayout data={staff} columns={staffColumns} onCreateClick={() => setIsRegisterModalOpen(true)}/>
            {isRegisterModalOpen && <StaffRegisterModal onClose={() => setIsRegisterModalOpen(false)} onCreate={handleSubmit}/>}
        </>
    )
}

export default StaffPage