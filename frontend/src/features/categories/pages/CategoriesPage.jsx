import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { createCategory, getCategories } from "../api/categories.api.js"
import { mapCategoriesToCards } from "../mappers/categories.mapper.js"
import CategoryCreateModal from "../components/CategoryCreateModal.jsx"

function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories()
                setCategories(mapCategoriesToCards(data))
            } catch(error) {
                console.log(error)
            }
        }
        fetchCategories()
    }, [])

    async function handleCreateCategory(formData) {
        try {
            await createCategory(formData)
            const data = await getCategories()
            setCategories(mapCategoriesToCards(data))
            setIsCreateModalOpen(false)
            toast.success("Category created successfully")
        } catch (error) {
            console.log(error)
            toast.error("Could not create category")
        }
    }

    return (
        <>
            <PageTitle  
                title="Welcome to Categories" 
                subtitle="In this section you can create, edit and view the categories you have"
            />
            <CardLayout 
                data={categories} 
                action="Categories" 
                route="categories" 
                onCreateClick={() => setIsCreateModalOpen(true)}
            />
            {isCreateModalOpen && <CategoryCreateModal 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreate={handleCreateCategory}
            />}
        </>
    )
}

export default CategoriesPage