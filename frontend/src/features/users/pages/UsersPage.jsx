import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import useDebouncedValue from "../../../shared/hooks/useDebouncedValue.js"
import { getUsers, createUser } from "../api/users.api.js"
import { mapUsersToCards } from "../mappers/users.mapper.js"
import UserCreateModal from "../components/UserCreateModal.jsx"

function UsersPage() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [roleFilter, setRoleFilter] = useState("all")
    const searchTerm = useDebouncedValue(searchInput)

    useEffect(() => {
        async function fetchUsers() {
            setIsLoading(true)

            try {
                const data = await getUsers({ search: searchTerm, status: statusFilter, role: roleFilter })
                setUsers(mapUsersToCards(data))
            } catch {
                toast.error("Could not load users")
            } finally {
                setIsLoading(false)
            }
        }
        fetchUsers()
    }, [searchTerm, statusFilter, roleFilter])

    async function handleCreateUser(formData) {
        try {
            await createUser(formData)
            const data = await getUsers({ search: searchTerm, status: statusFilter, role: roleFilter })
            setUsers(mapUsersToCards(data))
            setIsCreateModalOpen(false)
            toast.success("User created successfully")
        } catch {
            toast.error("Could not create user")
        }
    }

    function handleSearchChange(e) {
        setSearchInput(e.target.value)
    }

    function handleStatusChange(e) {
        setStatusFilter(e.target.value)
    }

    function handleRoleChange(e) {
        setRoleFilter(e.target.value)
    }

    return (
        <>
            <CardLayout 
                title="Welcome to Users" 
                subtitle="In this section you can create, edit and view the users you have"
                data={users} 
                action="Users" 
                route="users" 
                onCreateClick={() => setIsCreateModalOpen(true)}
                searchValue={searchInput}
                onSearchChange={handleSearchChange}
                filterGroups={[
                    {
                        key: "status",
                        label: "Status",
                        value: statusFilter,
                        onChange: handleStatusChange,
                        options: [
                            { value: "all", label: "All" },
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" }
                        ]
                    },
                    {
                        key: "role",
                        label: "Role",
                        value: roleFilter,
                        onChange: handleRoleChange,
                        options: [
                            { value: "all", label: "All" },
                            { value: "customer", label: "Customer" },
                            { value: "supplier", label: "Supplier" },
                            { value: "worker", label: "Worker" }
                        ]
                    }
                ]}
                resultsCount={users.length}
                emptyMessage="No users match the current search"
                isLoading={isLoading}
            />
            {isCreateModalOpen && <UserCreateModal onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateUser} />}
        </>
    )
}

export default UsersPage
