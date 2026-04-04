

import { useState, useEffect } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import CardLayout from '../../../shared/ui/layouts/card/CardLayout.jsx'

import { getCustomers } from '../api/customers.api.js'
import { mapCustomersToCards } from '../mappers/customers.mapper.js'

function CustomersPage() {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomers().then((data) => {
            setCustomers(mapCustomersToCards(data))
        })
    }, [])

    return (
        <>
            <PageTitle  title="Your Customers" subtitle="In this section you can view your customers"/>
            <CardLayout data={customers} action="Customers" route="customers"/>
        </>
    )
}

export default CustomersPage