import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { createCategory, getCategories } from "../api/categories.api.js"
import { mapCategoriesToCards } from "../mappers/categories.mapper.js"
import CategoryCreateModal from "../components/CategoryCreateModal.jsx"

function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories(searchTerm)
                setCategories(mapCategoriesToCards(data))
            } catch {
                toast.error("Could not load categories")
            }
        }
        fetchCategories()
    }, [searchTerm])

    async function handleCreateCategory(formData) {
        try {
            await createCategory(formData)
            const data = await getCategories(searchTerm)
            setCategories(mapCategoriesToCards(data))
            setIsCreateModalOpen(false)
            toast.success("Category created successfully")
        } catch {
            toast.error("Could not create category")
        }
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
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
                searchValue={searchTerm}
                onSearchChange={handleSearchChange}
            />
            {isCreateModalOpen && <CategoryCreateModal 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreate={handleCreateCategory}
            />}
        </>
    )
}

export default CategoriesPage