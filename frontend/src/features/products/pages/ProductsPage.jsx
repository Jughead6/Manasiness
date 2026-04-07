import { useState, useEffect } from "react"
import PageTitle from "../../../shared/ui/titles/page/PageTitle.jsx"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { getProducts, createProduct } from "../api/products.api.js"
import { mapProductsToCards } from "../mappers/products.mapper.js"
import ProductCreateModal from "../components/ProductCreateModal.jsx"

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts()
                setProducts(mapProductsToCards(data))
            } catch(error) {
                console.log(error)
            }
        }
        fetchProducts()
    }, [])

    async function handleCreateProduct(formData) {
        try {
            const result = await createProduct(formData)
            console.log(result)

            const data = await getProducts()
            setProducts(mapProductsToCards(data))
            setIsCreateModalOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <PageTitle 
                title="Welcome to Products" 
                subtitle="In this section you can create, edit and view the products you have"
            />
            <CardLayout 
                data={products} 
                action="Products" 
                route="products" 
                onCreateClick={() => setIsCreateModalOpen(true)}
            />
            {isCreateModalOpen && <ProductCreateModal 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreate={handleCreateProduct}
            />}
        </>
    )
}

export default ProductsPage