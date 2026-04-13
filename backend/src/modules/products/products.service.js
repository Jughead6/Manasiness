import { findActiveProductOptions, findAllProducts, findProductById, findProductByName, insertProduct, updateProductById, updateProductStatus } from "./products.repository.js"
import { findCategoryById } from "../categories/categories.repository.js"
import { badRequest, conflict, notFound } from "../../errors/http-errors.js"
import { requireAllowedValue, requirePositiveInteger, requirePositiveNumber, requireText } from "../../utils/validators.js"

const PRODUCT_STATES = [true, false]

function requireStock(value) {
    const parsed = Number(value)

    if (!Number.isInteger(parsed) || parsed < 0) {
        throw badRequest("stock invalid")
    }

    return parsed
}

export async function getAllProducts(data) {
    return findAllProducts(data)
}

export async function getProductDetail(data) {
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "product_id")

    const product = await findProductById({ id, storeId })

    if (!product) {
        throw notFound("Product not found")
    }

    return product
}

export async function createNewProduct(data) {
    const storeId = data.storeId
    const categoryId = requirePositiveInteger(data.category_id, "category_id")
    const name = requireText(data.name, "name")
    const image = data.image?.trim() || null
    const costPrice = requirePositiveNumber(data.cost_price, "cost_price")
    const salePrice = requirePositiveNumber(data.sale_price, "sale_price")
    const stock = requireStock(data.stock)

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
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "product_id")
    const categoryId = requirePositiveInteger(data.category_id, "category_id")
    const name = requireText(data.name, "name")
    const image = data.image?.trim() || null
    const costPrice = requirePositiveNumber(data.cost_price, "cost_price")
    const salePrice = requirePositiveNumber(data.sale_price, "sale_price")
    const stock = requireStock(data.stock)

    const product = await findProductById({ id, storeId })

    if (!product) {
        throw notFound("Product not found")
    }

    const category = await findCategoryById({ id: categoryId, storeId })

    if (!category) {
        throw notFound("Category not found")
    }

    if (!category.is_active) {
        throw conflict("Category unavailable")
    }

    const existingProduct = await findProductByName({ name, storeId })

    if (existingProduct && existingProduct.id !== id) {
        throw conflict("Product already exists")
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
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "product_id")
    const isActive = requireAllowedValue(data.isActive, PRODUCT_STATES, "is_active")

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
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "product_id")
    const isActive = requireAllowedValue(data.isActive, PRODUCT_STATES, "is_active")

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
