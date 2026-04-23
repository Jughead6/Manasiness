import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import useDebouncedValue from "../../../shared/hooks/useDebouncedValue.js"
import { createCategory, getCategories } from "../api/categories.api.js"
import { mapCategoriesToCards } from "../mappers/categories.mapper.js"
import CategoryCreateModal from "../components/CategoryCreateModal.jsx"

function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const searchTerm = useDebouncedValue(searchInput)

    useEffect(() => {
        async function fetchCategories() {
            setIsLoading(true)

            try {
                const data = await getCategories({ search: searchTerm, status: statusFilter })
                setCategories(mapCategoriesToCards(data))
            } catch {
                setCategories([])
                toast.error("Could not load categories")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategories()
    }, [searchTerm, statusFilter])

    async function handleCreateCategory(formData) {
        try {
            await createCategory(formData)
            const data = await getCategories({ search: searchTerm, status: statusFilter })
            setCategories(mapCategoriesToCards(data))
            setIsCreateModalOpen(false)
            toast.success("Category created successfully")
        } catch {
            toast.error("Could not create category")
        }
    }

    function handleSearchChange(e) {
        setSearchInput(e.target.value)
    }

    function handleStatusChange(e) {
        setStatusFilter(e.target.value)
    }

    return (
        <>
            <CardLayout 
                title="Welcome to Categories" 
                subtitle="In this section you can create, edit and view the categories you have"
                data={categories} 
                action="Categories" 
                route="categories" 
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
                    }
                ]}
                resultsCount={categories.length}
                emptyMessage="No categories match the current search"
                isLoading={isLoading}
            />
            {isCreateModalOpen && <CategoryCreateModal 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreate={handleCreateCategory}
            />}
        </>
    )
}

export default CategoriesPage
