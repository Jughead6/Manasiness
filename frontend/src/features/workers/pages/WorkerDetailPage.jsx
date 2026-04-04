

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import PersonTitle from '../../../shared/ui/titles/person/PersonTitle.jsx'
import PersonLayout from '../../../shared/ui/layouts/person/PersonLayout.jsx'

import { getWorkerById } from '../api/workers.api.js'
import { mapWorkerToDetail } from '../mappers/workers.mapper.js'

function WorkerDetailPage() {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        getWorkerById(id).then((data) => {
            setDetail(mapWorkerToDetail(data))
        })
    }, [id])

    if (!detail) {
        return null
    }

    return (
        <div className="page">
            <PersonTitle title="Worker" name={detail.name} />
            <PersonLayout
                data={detail.details}
                columns={['Date', 'Salary', 'State']}
                sectionTitle="Staff"
            />
        </div>
    )
}

export default WorkerDetailPage