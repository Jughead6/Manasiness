import { createNewCategory, disableCategory, enableCategory, getActiveCategoryOptions, getAllCategories, getCategoryDetail, updateCategory } from "./categories.service.js"

const DEFAULT_CATEGORY_IMAGE = "https://i.postimg.cc/KYydTs9w/noimage.png"

export async function getCategories(req, res, next) {
    try {
        const storeId = req.store.storeId
        const { search = "" } = req.query
        const categories = await getAllCategories({storeId, search})

        res.json(categories)
    } catch (error) {
        next(error)
    }
}

export async function getCategoryById(req, res, next) {
    const { id } = req.params

    try {
        const storeId = req.store.storeId
        const category = await getCategoryDetail({id, storeId})

        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }

        res.json(category)
    } catch (error) {
        next(error)
    }
}

export async function createCategory(req, res, next) {
    const { name, image } = req.body

    try {
        const storeId = req.store.storeId
        const cleanImage = image?.trim() || DEFAULT_CATEGORY_IMAGE
        const category = await createNewCategory({name, image: cleanImage, storeId})

        if (!category) {
            return res.status(500).json({ error: 'Category failed' })
        }

        res.status(201).json({
            message: 'Create successfully',
            category
        })
    } catch (error) {
        next(error)
    }
}

export async function editCategory(req, res, next) {
    const { id } = req.params
    const { name, image } = req.body

    try {
        const storeId = req.store.storeId
        const cleanImage = image?.trim() || DEFAULT_CATEGORY_IMAGE
        const category = await updateCategory({id, name, image: cleanImage, storeId})

        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }

        res.status(200).json({
            message: 'Edit successfully',
            category
        })
    } catch (error) {
        next(error)
    }
}

export async function deactivateCategory(req, res, next) {
    const { id } = req.params
    const isActive = false

    try {
        const storeId = req.store.storeId
        const category = await disableCategory({id, isActive, storeId})

        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }

        res.status(200).json({
            message: 'Category deactivated successfully',
            category
        })
    } catch (error) {
        next(error)
    }
}

export async function activateCategory(req, res, next) {
    const { id } = req.params
    const isActive = true

    try {
        const storeId = req.store.storeId
        const category = await enableCategory({id, isActive, storeId})

        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }

        res.status(200).json({
            message: 'Category activated successfully',
            category
        })
    } catch (error) {
        next(error)
    }
}

export async function getCategoryOptions(req, res, next) {
    try {
        const storeId = req.store.storeId
        const categories = await getActiveCategoryOptions({storeId})

        res.json(categories)
    } catch (error) {
        next(error)
    }
}
