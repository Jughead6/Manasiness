import { findActiveCategoryOptions, findAllCategories, findCategoryById, insertCategory, updateCategoryById, updateCategoryStatus, findCategoryByName } from "./categories.repository.js"
import { conflict, notFound } from "../../errors/http-errors.js"
import { requireAllowedValue, requirePositiveInteger, requireText } from "../../utils/validators.js"

const CATEGORY_STATES = [true, false]

export async function getAllCategories(data) {
    return findAllCategories(data)
}

export async function getCategoryDetail(data) {
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "category_id")

    const category = await findCategoryById({ id, storeId })

    if (!category) {
        throw notFound("Category not found")
    }

    return category
}

export async function createNewCategory(data) {
    const storeId = data.storeId
    const name = requireText(data.name, "name")
    const image = data.image?.trim() || null

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
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "category_id")
    const name = requireText(data.name, "name")
    const image = data.image?.trim() || null

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
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "category_id")
    const isActive = requireAllowedValue(data.isActive, CATEGORY_STATES, "is_active")

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
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "category_id")
    const isActive = requireAllowedValue(data.isActive, CATEGORY_STATES, "is_active")

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
