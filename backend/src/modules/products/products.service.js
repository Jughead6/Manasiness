import { findActiveProductOptions, findAllProducts, findProductById, findProductByName, insertProduct, updateProductById, updateProductStatus } from "./products.repository.js"
import { findCategoryById } from "../categories/categories.repository.js"
import { conflict, notFound } from "../../errors/http-errors.js"

export async function getAllProducts(data) {
    return findAllProducts(data)
}

export async function getProductDetail(data) {
    const { id, storeId } = data

    const product = await findProductById({ id, storeId })

    if (!product) {
        throw notFound("Product not found")
    }

    return product
}

export async function createNewProduct(data) {
    const { storeId, name, image, costPrice, salePrice, stock, categoryId } = data

    const category = await findCategoryById({ id: categoryId, storeId })

    if (!category) {
        throw notFound("Category not found")
    }

    if (!category.is_active) {
        throw conflict("Category unavailable")
    }

    const existingProduct = await findProductByName({ name, storeId })

    if (existingProduct) {
        throw conflict("Product already exists")
    }

    return insertProduct({
        category_id: categoryId,
        name,
        image,
        cost_price: costPrice,
        sale_price: salePrice,
        stock,
        storeId
    })
}

export async function updateProduct(data) {
    const { id, storeId, name, image, costPrice, salePrice, stock, categoryId } = data

    const product = await findProductById({ id, storeId })

    if (!product) {
        throw notFound("Product not found")
    }

    const category = await findCategoryById({ id: categoryId, storeId })

    if (!category) {
        throw notFound("Category not found")
    }

    const existingProduct = await findProductByName({ name, storeId })

    if (existingProduct && existingProduct.id !== id) {
        throw conflict("Product already exists")
    }

    const isChangingCategory = Number(product.category_id) !== Number(categoryId)

    if (!category.is_active && isChangingCategory) {
        throw conflict("Category unavailable")
    }

    return updateProductById({
        category_id: categoryId,
        name,
        image,
        cost_price: costPrice,
        sale_price: salePrice,
        stock,
        id,
        storeId
    })
}

export async function disableProduct(data) {
    const { id, storeId, isActive } = data

    const product = await findProductById({ id, storeId })

    if (!product) {
        throw notFound("Product not found")
    }

    return updateProductStatus({
        isActive,
        id,
        storeId
    })
}

export async function enableProduct(data) {
    const { id, storeId, isActive } = data

    const product = await findProductById({ id, storeId })

    if (!product) {
        throw notFound("Product not found")
    }

    return updateProductStatus({
        isActive,
        id,
        storeId
    })
}

export async function getActiveProductOptions(data) {
    return findActiveProductOptions(data)
}
