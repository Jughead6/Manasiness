import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import CardLayout from "../../../shared/ui/layouts/card/CardLayout.jsx"
import useDebouncedValue from "../../../shared/hooks/useDebouncedValue.js"
import { getProducts, createProduct } from "../api/products.api.js"
import { getCategories } from "../../categories/api/categories.api.js"
import { mapProductsToCards } from "../mappers/products.mapper.js"
import { mapCategoryOptions } from "../../categories/mappers/categories.mapper.js"
import ProductCreateModal from "../components/ProductCreateModal.jsx"

function ProductsPage() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [categoryOptions, setCategoryOptions] = useState([])
    const searchTerm = useDebouncedValue(searchInput)

    useEffect(() => {
        async function fetchCategoryOptions() {
            try {
                const data = await getCategories({ status: "all" })
                setCategoryOptions(mapCategoryOptions(data))
            } catch {
                setCategoryOptions([])
            }
        }

        fetchCategoryOptions()
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            setIsLoading(true)

            try {
                const data = await getProducts({ search: searchTerm, status: statusFilter, categoryId: categoryFilter })
                setProducts(mapProductsToCards(data))
            } catch {
                setProducts([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchProducts()
    }, [searchTerm, statusFilter, categoryFilter])

    async function handleCreateProduct(formData) {
        try {
            await createProduct(formData)

            const data = await getProducts({ search: searchTerm, status: statusFilter, categoryId: categoryFilter })
            setProducts(mapProductsToCards(data))
            setIsCreateModalOpen(false)
            toast.success("Successfully created product") 
        } catch {
            toast.error("Product could not be created")
        }
    }

    function handleSearchChange(e) {
        setSearchInput(e.target.value)
    }

    function handleStatusChange(e) {
        setStatusFilter(e.target.value)
    }

    function handleCategoryChange(e) {
        setCategoryFilter(e.target.value)
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
                searchValue={searchInput}
                onSearchChange={handleSearchChange}
                filterGroups={[
                    {
                        key: "status",
                        label: "Status",
                        value: statusFilter,
                        onChange: handleStatusChange,
                        options: [
                            { value: "all", label: "All" },
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" }
                        ]
                    },
                    {
                        key: "category",
                        label: "Category",
                        value: categoryFilter,
                        onChange: handleCategoryChange,
                        options: [{ value: "all", label: "All" }, ...categoryOptions]
                    }
                ]}
                resultsCount={products.length}
                emptyMessage="No products match the current search"
                isLoading={isLoading}
            />
            {isCreateModalOpen && <ProductCreateModal 
                onClose={() => setIsCreateModalOpen(false)} 
                onCreate={handleCreateProduct}
            />}
        </>
    )
}

export default ProductsPage
