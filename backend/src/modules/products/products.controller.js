import { getAllProducts, getProductDetail, createNewProduct, updateProduct, disableProduct, enableProduct, getActiveProductOptions } from "./products.service.js"

export async function getProducts(req, res, next) {
    try {
        const products = await getAllProducts()
        res.json(products)
    } catch (error) {
        next(error)
    }
}

export async function getProductById(req, res, next) {
    const { id } = req.params

    try {
        const product = await getProductDetail(id)

        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }

        res.json(product)
    } catch (error) {
        next(error)
    }
}

export async function createProduct(req, res, next) {
    const { category_id, name, cost_price, sale_price, stock } = req.body

    try {
        const product = await createNewProduct({ category_id, name, cost_price, sale_price, stock })

        if (!product) {
            return res.status(500).json({ error: "Uncreated product" })
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
        const product = await updateProduct(id, { category_id, name, image, cost_price, sale_price, stock })

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

    try {
        const product = await disableProduct(id)

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

    try {
        const product = await enableProduct(id)

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
        const products = await getActiveProductOptions()
        res.json(products)
    } catch (error) {
        next(error)
    }
}