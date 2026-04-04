

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import EntityTitle from '../../../shared/ui/titles/entity/EntityTitle.jsx'
import EntityLayout  from '../../../shared/ui/layouts/entity/EntityLayout.jsx'

import { getProductById } from '../api/products.api.js'
import { mapProductToDetail } from '../mappers/products.mapper.js'

function ProductDetailPage() {
    const { id } = useParams()
    const [ detail, setDetail ] = useState(null)

    useEffect(() => {
        getProductById(id).then((data) => {
            setDetail(mapProductToDetail(data))
        })
    }, [id])

    if (!detail) {
        return null
    }

    return (
        <div>
            <EntityTitle entity="Product" idx={id} />
            <EntityLayout detail={detail} />
        </div>
    )
}

export default ProductDetailPage