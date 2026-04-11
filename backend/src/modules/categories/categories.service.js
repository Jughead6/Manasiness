import { findActiveCategoryOptions, findAllCategories, findCategoryById, insertCategory, updateCategoryById, updateCategoryStatus } from "./categories.repository.js"

export async function getAllCategories(data) {
    return findAllCategories(data)
}

export async function getCategoryDetail(data) {
    return findCategoryById(data)
}

export async function createNewCategory(data) {
    return insertCategory(data)
}

export async function updateCategory(data) {
    return updateCategoryById(data)
}

export async function disableCategory(data) {
    return updateCategoryStatus(data)
}

export async function enableCategory(data) {
    return updateCategoryStatus(data)
}

export async function getActiveCategoryOptions(data) {
    return findActiveCategoryOptions(data)
}