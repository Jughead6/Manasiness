import { createNewCategory, disableCategory, enableCategory, getActiveCategoryOptions, getAllCategories, getCategoryDetail, updateCategory } from "./categories.service.js"
import { parseOptionalSearch, requireText, parseOptionalImage, requirePositiveInteger } from "../../utils/validators/index.js"

export async function getCategories(req, res, next) {
    try {
        const storeId = req.store.storeId
        const search = parseOptionalSearch(req.query.search, "search")

        const categories = await getAllCategories({storeId, search})

        res.json(categories)
    } catch (error) {
        next(error)
    }
}

export async function getCategoryById(req, res, next) {
    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")

        const category = await getCategoryDetail({id, storeId})


        res.json(category)
    } catch (error) {
        next(error)
    }
}

export async function createCategory(req, res, next) {
    try {
        const storeId = req.store.storeId
        const name = requireText(req.body.name, "name")
        const image = parseOptionalImage(req.body.image, "image")

        const category = await createNewCategory({name, image, storeId})

        res.status(201).json({
            message: 'Create successfully',
            category
        })
    } catch (error) {
        next(error)
    }
}

export async function editCategory(req, res, next) {
    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")
        const name = requireText(req.body.name, "name")
        const image = parseOptionalImage(req.body.image, "image")

        const category = await updateCategory({id, name, image, storeId})

        res.status(200).json({
            message: 'Edit successfully',
            category
        })
    } catch (error) {
        next(error)
    }
}

export async function deactivateCategory(req, res, next) {
    const isActive = false

    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")

        const category = await disableCategory({id, isActive, storeId})


        res.status(200).json({
            message: 'Category deactivated successfully',
            category
        })
    } catch (error) {
        next(error)
    }
}

export async function activateCategory(req, res, next) {
    const isActive = true

    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")

        const category = await enableCategory({id, isActive, storeId})


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
