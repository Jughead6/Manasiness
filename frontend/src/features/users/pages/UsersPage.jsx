import { useState, useEffect } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import CardLayout from '../../../shared/ui/layouts/card/CardLayout.jsx'

import { getUsers } from '../api/users.api.js'
import { mapUsersToCards } from '../mappers/users.mapper.js'

import UserCreateModal from '../components/UserCreateModal.jsx'

function UsersPage() {
    const [ users, setUsers ] = useState([])
    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false)

    useEffect(() => {
        getUsers().then((data) => {
            setUsers(mapUsersToCards(data))
        })
    }, [])

    return (
        <>
            <PageTitle  title="Welcome to Users" subtitle="In this section you can create, edit and view the Users you have"/>
            <CardLayout data={users} action="Users" route="users" onCreateClick={() => setIsCreateModalOpen(true)}/>
            {isCreateModalOpen && <UserCreateModal onClose={() => setIsCreateModalOpen(false)}/>}
        </>
    )
}

export default UsersPage