import { findAllProducts, findProductById, insertProduct, updateProductById, updateProductStatus, findActiveProductOptions } from "./products.repository.js"

export async function getAllProducts(data) {
    return findAllProducts(data)
}

export async function getProductDetail(data) {
    return findProductById(data)
}

export async function createNewProduct(data) {
    return insertProduct(data)
}

export async function updateProduct(data) {
    return updateProductById(data)
}

export async function disableProduct(data) {
    return updateProductStatus(data)
}

export async function enableProduct(data) {
    return updateProductStatus(data)
}

export async function getActiveProductOptions(data) {
    return findActiveProductOptions(data)
}
