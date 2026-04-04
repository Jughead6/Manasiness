

import { useState, useEffect } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import CardLayout from '../../../shared/ui/layouts/card/CardLayout.jsx'

import { getSuppliers } from '../api/suppliers.api.js'
import { mapSuppliersToCards } from '../mappers/suppliers.mapper.js'

function SuppliersPage() {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        getSuppliers().then((data) => {
            setSuppliers(mapSuppliersToCards(data))
        })
    }, [])

    return (
        <>
            <PageTitle  title="Your Suppliers" subtitle="In this section you can view your suppliers"/>
            <CardLayout data={suppliers} action="suppliers" route="suppliers"/>
        </>
    )
}

export default SuppliersPage
