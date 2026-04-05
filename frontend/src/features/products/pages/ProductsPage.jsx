import { useState, useEffect } from 'react'

import PageTitle from '../../../shared/ui/titles/page/PageTitle.jsx'
import CardLayout from '../../../shared/ui/layouts/card/CardLayout.jsx'

import { getProducts } from '../api/products.api.js'
import { mapProductsToCards } from '../mappers/products.mapper.js'

import ProductCreateModal from '../components/ProductCreateModal.jsx'

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(mapProductsToCards(data))
        })
    }, [])

    return (
        <>
            <PageTitle title="Welcome to Products" subtitle="In this section you can create, edit and view the products you have"/>
            <CardLayout data={products} action="Products" route="products" onCreateClick={() => setIsCreateModalOpen(true)}/>
            {isCreateModalOpen && <ProductCreateModal onClose={() => setIsCreateModalOpen(false)}/>}
        </>
    )
}

export default ProductsPage