

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import EntityTitle from '../../../shared/ui/titles/entity/EntityTitle.jsx'
import EntityLayout  from '../../../shared/ui/layouts/entity/EntityLayout.jsx'

import { getCategoryById } from '../api/categories.api.js'
import { mapCategoryToDetail } from '../mappers/categories.mapper.js'

function CategoryDetailPage() {
    const { id } = useParams()
    const [ detail, setDetail ] = useState(null)

    useEffect(() => {
        getCategoryById(id).then((data) => {
            setDetail(mapCategoryToDetail(data))
        })
    }, [id])

    if (!detail) {
        return null
    }

    return (
        <>
            <EntityTitle entity="Category" idx={id}/>
            <EntityLayout detail={detail}/>
        </>
    )
}

export default CategoryDetailPage