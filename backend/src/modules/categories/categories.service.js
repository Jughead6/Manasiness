import { findActiveCategoryOptions, findAllCategories, findCategoryById, insertCategory, updateCategoryById, updateCategoryStatus } from "./categories.repository.js"

export async function getAllCategories() {
    return findAllCategories()
}

export async function getCategoryDetail(id) {
    return findCategoryById(id)
}

export async function createNewCategory(data) {
    return insertCategory(data)
}

export async function updateCategory(id, data) {
    return updateCategoryById(id, data)
}

export async function disableCategory(id) {
    return updateCategoryStatus(id, false)
}

export async function enableCategory(id) {
    return updateCategoryStatus(id, true)
}

export async function getActiveCategoryOptions() {
    return findActiveCategoryOptions()
}