

import { useEffect, useState } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import TableLayout from '../../../shared/ui/layouts/table/TableLayout.jsx'

import { getStaff } from '../api/staff.api.js'
import { mapStaffToTables } from '../mappers/staff.mapper.js'

function StaffPage() {
    const [staff, setStaff] = useState([])

    const staffColumns = [
        { key: 'date', label: 'Date' },
        { key: 'worker', label: 'Worker' },
        { key: 'salary', label: 'Salary' },
        { key: 'state', label: 'State' }
    ]

    useEffect(() => {
        getStaff().then((data) => {
            setStaff(mapStaffToTables(data))
        })
    }, [])

    return (
        <>
            <PageTitle title="Your Staff" subtitle="In this section you can view your staff record."/>
            <TableLayout data={staff} columns={staffColumns}/>
        </>
    )
}

export default StaffPage