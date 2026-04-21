import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import { getProducts, createProduct } from "../api/products.api.js"
import { mapProductsToCards } from "../mappers/products.mapper.js"
import ProductCreateModal from "../components/ProductCreateModal.jsx"

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts(searchTerm)
                setProducts(mapProductsToCards(data))
            } catch {
                setProducts([])
            }
        }
        fetchProducts()
    }, [searchTerm])

    async function handleCreateProduct(formData) {
        try {
            await createProduct(formData)

            const data = await getProducts(searchTerm)
            setProducts(mapProductsToCards(data))
            setIsCreateModalOpen(false)
            toast.success("Successfully created product") 
        } catch {
            toast.error("Product could not be created")
        }
    }

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <>

            <CardLayout
                title="Welcome to Products" 
                subtitle="In this section you can create, edit and view the products you have"
                data={products}
                action="Products"
                route="products"
                onCreateClick={() => setIsCreateModalOpen(true)}
                searchValue={searchTerm}
                onSearchChange={handleSearchChange}
            />
            {isCreateModalOpen && <ProductCreateModal 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreate={handleCreateProduct}
            />}
        </>
    )
}

export default ProductsPage