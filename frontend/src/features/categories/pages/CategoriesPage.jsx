import { useEffect, useState } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import CardLayout from '../../../shared/ui/layouts/card/CardLayout.jsx'

import { getCategories } from '../api/categories.api.js'
import { mapCategoriesToCards } from '../mappers/categories.mapper.js'

import CategoryCreateModal from '../components/CategoryCreateModal.jsx'

function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(mapCategoriesToCards(data))
        })
    }, [])

    return (
        <>
            <PageTitle  title="Welcome to Categories" subtitle="In this section you can create, edit and view the categories you have"/>
            <CardLayout data={categories} action="Categories" route="categories" onCreateClick={() => setIsCreateModalOpen(true)}/>
            {isCreateModalOpen && <CategoryCreateModal onClose={() => setIsCreateModalOpen(false)}/>}
        </>
    )
}

export default CategoriesPage