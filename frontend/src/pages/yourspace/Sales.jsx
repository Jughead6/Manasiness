import '../pages.css'
import { useEffect, useState } from 'react'

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutTable from '../../components/public/layout/table/layouttable.jsx'
import { getSales } from '../../components/content/yourspace/salescontent'

function Sales() {
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
        async function loadSales() {
            const result = await getSales()
            setSales(result)
        }

        loadSales()
    }, [])

    return (
        <div className="page">
            <PageTitle  title="Your Sales" subtitle="In this section you can view your sales record."/>
            <LayoutTable data={sales} columns={salesColumns} />
        </div>
    )
}

export default Sales