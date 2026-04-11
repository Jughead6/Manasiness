import { getAllProducts, getProductDetail, createNewProduct, updateProduct, disableProduct, enableProduct, getActiveProductOptions } from "./products.service.js"

const DEFAULT_PRODUCT_IMAGE = "https://i.postimg.cc/KYydTs9w/noimage.png"

export async function getProducts(req, res, next) {
    try {
        const storeId = req.store.storeId
        const { search = "" } = req.query
        const products = await getAllProducts({storeId, search})
        
        res.json(products)
    } catch (error) {
        next(error)
    }
}

export async function getProductById(req, res, next) {
    const { id } = req.params

    try {
        const storeId = req.store.storeId
        const product = await getProductDetail({id, storeId})

        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.json(product)
    } catch (error) {
        next(error)
    }
}

export async function createProduct(req, res, next) {
    const { category_id, name, image, cost_price, sale_price, stock } = req.body

    try {
        const storeId = req.store.storeId
        const cleanImage = image?.trim() || DEFAULT_PRODUCT_IMAGE
        const product = await createNewProduct({category_id, name, image: cleanImage, cost_price, sale_price, stock, storeId})

        if (!product) {
            return res.status(500).json({ error: "Product failed" })
        }

        res.status(201).json({
            message: "Create successfully",
            product
        })
    } catch (error) {
        next(error)
    }
}

export async function editProduct(req, res, next) {
    const { id } = req.params
    const { category_id, name, image, cost_price, sale_price, stock } = req.body

    try {
        const storeId = req.store.storeId
        const cleanImage = image?.trim() || DEFAULT_PRODUCT_IMAGE
        const product = await updateProduct({id, category_id, name, image: cleanImage, cost_price, sale_price, stock, storeId})

        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.status(200).json({
            message: "Edit successfully",
            product
        })
    } catch (error) {
        next(error)
    }
}

export async function deactivateProduct(req, res, next) {
    const { id } = req.params
    const isActive = false

    try {
        const storeId = req.store.storeId
        const product = await disableProduct({id, storeId, isActive})

        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.status(200).json({
            message: "Product deactivated successfully",
            product
        })
    } catch (error) {
        next(error)
    }
}

export async function activateProduct(req, res, next) {
    const { id } = req.params
    const isActive = true

    try {
        const storeId = req.store.storeId
        const product = await enableProduct({id, storeId, isActive})

        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }

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
        const products = await getActiveProductOptions({storeId})
        res.json(products)
    } catch (error) {
        next(error)
    }
}
