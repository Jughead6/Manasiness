

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import PersonTitle from '../../../shared/ui/titles/person/PersonTitle.jsx'
import PersonLayout from '../../../shared/ui/layouts/person/PersonLayout.jsx'

import { getCustomerById } from '../api/customers.api.js'
import { mapCustomerToDetail } from '../mappers/customers.mapper.js'

function CustomerDetailPage() {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        getCustomerById(id).then((data) => {
            setDetail(mapCustomerToDetail(data))
        })
    }, [id])

    if (!detail) {
        return null
    }

    return (
        <>
            <PersonTitle title="Customer" name={detail.name} />
            <PersonLayout
                data={detail.details}
                columns={['Date', 'Product', 'Price', 'Quantity', 'State']}
                sectionTitle="Sales"
            />
        </>
    )
}

export default CustomerDetailPage