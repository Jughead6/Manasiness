import {
    findAllProducts,
    findProductById,
    insertProduct,
    updateProductById,
    updateProductStatus,
    findActiveProductOptions
} from "./products.repository.js"

export async function getAllProducts() {
    return findAllProducts()
}

export async function getProductDetail(id) {
    return findProductById(id)
}

export async function createNewProduct(data) {
    return insertProduct(data)
}

export async function updateProduct(id, data) {
    return updateProductById(id, data)
}

export async function disableProduct(id) {
    return updateProductStatus(id, false)
}

export async function enableProduct(id) {
    return updateProductStatus(id, true)
}

export async function getActiveProductOptions() {
    return findActiveProductOptions()
}