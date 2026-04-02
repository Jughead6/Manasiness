import '../pages.css'
import { useEffect, useState } from 'react'

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutTable from '../../components/public/layout/table/layouttable.jsx'
import { getStaff } from '../../components/content/yourspace/staffcontent'

function Staff() {
    const [staff, setStaff] = useState([])

    const staffColumns = [
        { key: 'date', label: 'Date' },
        { key: 'worker', label: 'Worker' },
        { key: 'salary', label: 'Salary' },
        { key: 'state', label: 'State' }
    ]

    useEffect(() => {
        async function loadStaff() {
            const result = await getStaff()
            setStaff(result)
        }

        loadStaff()
    }, [])

    return (
        <div className="page">
            <PageTitle  title="Your Staff" subtitle="In this section you can view your staff record."/>
            <LayoutTable data={staff} columns={staffColumns} />
        </div>
    )
}

export default Staff