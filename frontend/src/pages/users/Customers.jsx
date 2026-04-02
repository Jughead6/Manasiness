import '../pages.css'
import { useState, useEffect } from 'react'

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutCard from '../../components/public/layout/card/layoutcard.jsx'
import { getCustomers } from '../../components/content/users/customerscontent'

function Customers() {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomers().then(setCustomers)
    }, [])

    return (
        <div className="page">
            <PageTitle  title="Your Customers" subtitle="In this section you can view your customers"/>
            <LayoutCard action={customers} />
        </div>
    )
}

export default Customers