import './Products.css'
import { useState, useEffect } from 'react'

import ActionTitle from '../../../components/public/actions/title/actiontitle.jsx'
import ActionLayout from '../../../components/public/actions/layout/actionlayout.jsx'
import ActionContent from '../../../components/public/actions/content/actioncontent.jsx'
import { getProducts } from '../../../components/actions/products/productscontent.jsx'

function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then(setProducts)
    }, [])
    return (
        <div id="products">
            <ActionTitle  title="Welcome to Products" subtitle="In this section you can create, edit and view the products you have"/>
            <ActionLayout/>
            <ActionContent action={products}/>
        </div>
    )
}

export default Products