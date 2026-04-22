import { findActiveCategoryOptions, findAllCategories, findCategoryById, insertCategory, updateCategoryById, updateCategoryStatus, findCategoryByName } from "./categories.repository.js"
import { conflict, notFound } from "../../errors/http-errors.js"
import { requireAllowedValue, requirePositiveInteger, requireText, parseOptionalImage } from "../../utils/validators/index.js"

export async function getAllCategories(data) {
    return findAllCategories(data)
}

export async function getCategoryDetail(data) {
    const { id, storeId } = data

    const category = await findCategoryById({ id, storeId })

    if (!category) {
        throw notFound("Category not found")
    }

    return category
}

export async function createNewCategory(data) {
    const { storeId, name, image } = data

    const existingCategory = await findCategoryByName({ name, storeId })

    if (existingCategory) {
        throw conflict("Category already exists")
    }

    return insertCategory({
        name,
        image,
        storeId
    })
}

export async function updateCategory(data) {
    const { id ,storeId, name, image } = data

    const category = await findCategoryById({ id, storeId })

    if (!category) {
        throw notFound("Category not found")
    }

    const existingCategory = await findCategoryByName({ name, storeId })

    if (existingCategory && existingCategory.id !== id) {
        throw conflict("Category already exists")
    }

    return updateCategoryById({
        name,
        image,
        id,
        storeId
    })
}

export async function disableCategory(data) {
    const { id, storeId, isActive} = data

    const category = await findCategoryById({ id, storeId })

    if (!category) {
        throw notFound("Category not found")
    }

    return updateCategoryStatus({
        isActive,
        id,
        storeId
    })
}

export async function enableCategory(data) {
    const { id, storeId, isActive} = data

    const category = await findCategoryById({ id, storeId })

    if (!category) {
        throw notFound("Category not found")
    }

    return updateCategoryStatus({
        isActive,
        id,
        storeId
    })
}

export async function getActiveCategoryOptions(data) {
    return findActiveCategoryOptions(data)
}
