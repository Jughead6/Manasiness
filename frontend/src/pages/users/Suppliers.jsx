import '../pages.css'
import { useState, useEffect } from 'react'

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutCard from '../../components/public/layout/card/layoutcard.jsx'
import { getSuppliers } from '../../components/content/users/supplierscontent'

function Suppliers() {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        getSuppliers().then(setSuppliers)
    }, [])

    return (
        <div className="page">
            <PageTitle  title="Your Suppliers" subtitle="In this section you can view your suppliers"/>
            <LayoutCard data={suppliers} action="suppliers" route="suppliers"/>
        </div>
    )
}

export default Suppliers
