import { getAllProducts, getProductDetail, createNewProduct, updateProduct, disableProduct, enableProduct, getActiveProductOptions } from "./products.service.js"
import { parseOptionalSearch, requirePositiveInteger, requireText, parseOptionalImage, requirePositiveNumber, requireNonNegativeNumber } from "../../utils/validators/index.js"

export async function getProducts(req, res, next) {
    try {
        const storeId = req.store.storeId
        const search = parseOptionalSearch(req.query.search, "search")

        const products = await getAllProducts({ storeId, search })

        res.json(products)
    } catch (error) {
        next(error)
    }
}

export async function getProductById(req, res, next) {
    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")

        const product = await getProductDetail({ id, storeId })

        res.json(product)
    } catch (error) {
        next(error)
    }
}

export async function createProduct(req, res, next) {
    try {
        const storeId = req.store.storeId
        const categoryId = requirePositiveInteger(req.body.category_id, "category_id")
        const name = requireText(req.body.name, "name")
        const image = parseOptionalImage(req.body.image, "image")
        const costPrice = requirePositiveNumber(req.body.cost_price, "cost_price")
        const salePrice = requirePositiveNumber(req.body.sale_price, "sale_price")
        const stock = requireNonNegativeNumber(req.body.stock, "stock")

        const product = await createNewProduct({ categoryId, name, image, costPrice, salePrice, stock, storeId })

        res.status(201).json({
            message: "Create successfully",
            product
        })
    } catch (error) {
        next(error)
    }
}

export async function editProduct(req, res, next) {
    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")
        const categoryId = requirePositiveInteger(req.body.category_id, "category_id")
        const name = requireText(req.body.name, "name")
        const image = parseOptionalImage(req.body.image, "image")
        const costPrice = requirePositiveNumber(req.body.cost_price, "cost_price")
        const salePrice = requirePositiveNumber(req.body.sale_price, "sale_price")
        const stock = requireNonNegativeNumber(req.body.stock, "stock")

        const product = await updateProduct({ id, categoryId, name, image, costPrice, salePrice, stock, storeId })

        res.status(200).json({
            message: "Edit successfully",
            product
        })
    } catch (error) {
        next(error)
    }
}

export async function deactivateProduct(req, res, next) {
    const isActive = false

    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")

        const product = await disableProduct({ id, storeId, isActive })

        res.status(200).json({
            message: "Product deactivated successfully",
            product
        })
    } catch (error) {
        next(error)
    }
}

export async function activateProduct(req, res, next) {
    const isActive = true

    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")

        const product = await enableProduct({ id, storeId, isActive })

        res.status(200).json({
            message: "Product activated successfully",
            product
        })
    } catch (error) {
        next(error)
    }
}

export async function getProductOptions(req, res, next) {
    try {
        const storeId = req.store.storeId

        const products = await getActiveProductOptions({ storeId })

        res.json(products)
    } catch (error) {
        next(error)
    }
}
