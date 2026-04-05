
import { useEffect, useState } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import TableLayout from '../../../shared/ui/layouts/table/TableLayout.jsx'

import { getSales } from '../api/sales.api'
import { mapSalesToTables } from '../mappers/sales.mapper.js'

function SalesPage() {
    const [sales, setSales] = useState([])

    const salesColumns = [
        { key: 'date', label: 'Date' },
        { key: 'product', label: 'Product' },
        { key: 'worker', label: 'Worker' },
        { key: 'price', label: 'Price' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'state', label: 'State' }
    ]

    useEffect(() => {
        getSales().then((data) => {
            setSales(mapSalesToTables(data))
        })
    }, [])

    return (
        <>
            <PageTitle title="Your Sales" subtitle="In this section you can view your sales record."/>
            <TableLayout data={sales} columns={salesColumns}/>
        </>
    )
}

export default SalesPage