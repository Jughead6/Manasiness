import { useState, useEffect } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import CardLayout from '../../../shared/ui/layouts/card/CardLayout.jsx'

import { getUsers, createUser } from '../api/users.api.js'
import { mapUsersToCards } from '../mappers/users.mapper.js'

import UserCreateModal from '../components/UserCreateModal.jsx'

function UsersPage() {
    const [ users, setUsers ] = useState([])
    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getUsers()
                setUsers(mapUsersToCards(data))
            } catch(error) {
                console.log(error)
            }
        }

        fetchUsers()
    }, [])

    async function handleCreateUser(formData) {
        try {
            const result = await createUser(formData)
            console.log(result)
            
            const data = await getUsers()
            setUsers(mapUsersToCards(data))
            setIsCreateModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <PageTitle  title="Welcome to Users" subtitle="In this section you can create, edit and view the Users you have"/>
            <CardLayout data={users} action="Users" route="users" onCreateClick={() => setIsCreateModalOpen(true)}/>
            {isCreateModalOpen && <UserCreateModal onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateUser}/>}
        </>
    )
}

export default UsersPage