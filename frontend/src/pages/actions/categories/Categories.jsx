import './Categories.css'
import { useState, useEffect } from 'react'

import ActionTitle from '../../../components/public/actions/title/actiontitle.jsx'
import ActionLayout from '../../../components/public/actions/layout/actionlayout.jsx'
import ActionContent from '../../../components/public/actions/content/actioncontent.jsx'
import { getCategories } from '../../../components/actions/categories/categoriescontent.jsx'

function Categories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    return (
        <div id="categories">
            <ActionTitle title="Welcome to Categories" subtitle="In this section you can create, edit and view the categories you have"/>
            <ActionLayout/>
            <ActionContent action={categories}/>
        </div>
    )
}

export default Categories