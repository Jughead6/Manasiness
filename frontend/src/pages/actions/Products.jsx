import '../pages.css'
import { useState, useEffect } from 'react'

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutCard from '../../components/public/layout/card/layoutcard.jsx'
import { getProducts } from '../../components/content/actions/productscontent.jsx'

function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then(setProducts)
    }, [])
    return (
        <div className="page">
            <PageTitle  title="Welcome to Products" subtitle="In this section you can create, edit and view the products you have"/>
            <LayoutCard action={products}/>

        </div>
    )
}

export default Products 