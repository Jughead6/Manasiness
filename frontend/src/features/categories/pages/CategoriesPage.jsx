import { useEffect, useState } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import CardLayout from '../../../shared/ui/layouts/card/CardLayout.jsx'

import { getCategories } from '../api/categories.api.js'
import { mapCategoriesToCards } from '../mappers/categories.mapper.js'

function CategoriesPage() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(mapCategoriesToCards(data))
        })
    }, [])

    return (
        <>
            <PageTitle  title="Welcome to Categories" subtitle="In this section you can create, edit and view the categories you have"/>
            <CardLayout data={categories} action="Categories" route="categories"/>
        </>
    )
}

export default CategoriesPage