

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import PersonTitle from '../../../shared/ui/titles/person/PersonTitle.jsx'
import PersonLayout from '../../../shared/ui/layouts/person/PersonLayout.jsx'

import { getSupplierById } from '../api/suppliers.api.js'
import { mapSupplierToDetail } from '../mappers/suppliers.mapper.js'

function SupplierDetailPage() {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        getSupplierById(id).then((data) => {
            setDetail(mapSupplierToDetail(data))
        })
    }, [id])

    if (!detail) {
        return null
    }

    return (
        <>
            <PersonTitle title="Supplier" name={detail.name} />
            <PersonLayout
                data={detail.details}
                columns={['Date', 'Product', 'Price', 'Quantity', 'State']}
                sectionTitle="Orders"
            />
        </>
    )
}

export default SupplierDetailPage