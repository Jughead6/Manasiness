import { createNewCategory, disableCategory, enableCategory, getActiveCategoryOptions, getAllCategories, getCategoryDetail, updateCategory } from "./categories.service.js"

export async function getCategories(req, res, next) {
    try {
        const categories = await getAllCategories()

        res.json(categories)
    } catch (error) {
        next(error)
    }
}

export async function getCategoryById(req, res, next) {
    const { id } = req.params

    try {
        const category = await getCategoryDetail(id)

        if (!category) {
            return res.status(404).json({ error: 'Category not found' })
        }

        res.json(category)
    } catch (error) {
        next(error)
    }
}

export async function createCategory(req, res, next) {
    const { name } = req.body

    try {
        const category = await createNewCategory({ name })

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
        const category = await updateCategory(id, { name, image })

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

    try {
        const category = await disableCategory(id)

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

    try {
        const category = await enableCategory(id)

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
        const categories = await getActiveCategoryOptions()

        res.json(categories)
    } catch (error) {
        next(error)
    }
}