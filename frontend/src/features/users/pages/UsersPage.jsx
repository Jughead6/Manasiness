import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { getUsers, createUser } from "../api/users.api.js"
import { mapUsersToCards } from "../mappers/users.mapper.js"
import UserCreateModal from "../components/UserCreateModal.jsx"

function UsersPage() {
    const [users, setUsers] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await getUsers(searchTerm)
                setUsers(mapUsersToCards(data))
            } catch {
                setUsers([])
            }
        }
        fetchUsers()
    }, [searchTerm])

    async function handleCreateUser(formData) {
        try {
            await createUser(formData)
            const data = await getUsers(searchTerm)
            setUsers(mapUsersToCards(data))
            setIsCreateModalOpen(false)
            toast.success("User created successfully")
        } catch {
            toast.error("Could not create user")
        }
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <PageTitle  
                title="Welcome to Users" 
                subtitle="In this section you can create, edit and view the users you have"
            />
            <CardLayout 
                data={users} 
                action="Users" 
                route="users" 
                onCreateClick={() => setIsCreateModalOpen(true)}
                searchValue={searchTerm}
                onSearchChange={handleSearchChange}
            />
            {isCreateModalOpen && <UserCreateModal onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateUser} />}
        </>
    )
}

export default UsersPage