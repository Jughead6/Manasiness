import '../pages.css'
import { useState, useEffect } from 'react'

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutCard from '../../components/public/layout/card/layoutcard.jsx'
import { getCategories } from '../../components/content/actions/categoriescontent.jsx'

function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    return (
        <div className="page">
            <PageTitle title="Welcome to Categories" subtitle="In this section you can create, edit and view the categories you have"/>
            <LayoutCard data={categories} action="Categories" route="categories"/>
        </div>
    )
}

export default Categories