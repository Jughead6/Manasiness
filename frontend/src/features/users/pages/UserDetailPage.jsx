import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import EntityTitle from '../../../shared/ui/titles/entity/EntityTitle.jsx'
import EntityLayout  from '../../../shared/ui/layouts/entity/EntityLayout.jsx'

import { getUserById } from '../api/users.api.js'
import { mapUserToDetail } from '../mappers/users.mapper.js'

import UsersDesactivationModal from '../components/UsersDesactivationModal.jsx'

function UserDetailPage() {
    const { id } = useParams()
    const [ detail, setDetail ] = useState(null)
    const [ isDesactivationOpen, setIsDesactivationOpen ] = useState(false)

    useEffect(() => {
        getUserById(id).then((data) => {
            setDetail(mapUserToDetail(data))
        })
    }, [id])

    if (!detail) {
        return null
    }

    return (
        <>
            <EntityTitle entity="User" idx={id}/>
            <EntityLayout detail={detail} onDesactivateClick={() => setIsDesactivationOpen(true)}/>
            {isDesactivationOpen && <UsersDesactivationModal onClose={() => setIsDesactivationOpen(false)} />}
        </>
    )
}

export default UserDetailPage