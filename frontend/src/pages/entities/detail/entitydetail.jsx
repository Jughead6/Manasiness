import './entitydetail.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import LayoutDetail from '../../../components/public/entities/detail/layout/layoutdetail.jsx'
import DetailToolbar from '../../../components/public/entities/detail/toolbar/detailtoolbar.jsx'

import { getDetails, categoriesInfo, productsInfo, usersInfo } from '../../../components/content/entity/content/detailcontent.jsx'

function EntityDetail({ route }) {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        async function loadDetail() {
            const data = await getDetails(route, id)

            if (route === 'categories') {
                setDetail(categoriesInfo(data))
            }

            if (route === 'products') {
                setDetail(productsInfo(data))
            }

            if (route === 'users') {
                setDetail(usersInfo(data))
            }
        }

        loadDetail()
    }, [route, id])

    if (!detail) {
        return <div>Loading...</div>
    }

    return (
        <div className="entity-detail">
            <LayoutDetail detail={detail} />
            <DetailToolbar />
        </div>
    )
}

export default EntityDetail