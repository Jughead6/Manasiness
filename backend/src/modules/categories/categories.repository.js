import pool from "../../config/db.js"

export async function findAllCategories(data) {
    const { storeId, search = "" } = data
    const cleanSearch = search.trim()
    const searchValue = `%${cleanSearch}%`

    const result = await pool.query(`
        SELECT id, name, image, created_at, updated_at, is_active
        FROM categories
        WHERE store_id = $1
            AND (
                $2 = ''
                OR name ILIKE $3
            )
        ORDER BY id ASC
    `, [storeId, cleanSearch, searchValue])

    return result.rows
}

export async function findCategoryById(data) {
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT id, name, image, created_at, updated_at, is_active
        FROM categories
        WHERE id = $1 AND store_id = $2
    `, [id, storeId])

    return result.rows[0] || null
}

export async function insertCategory(data) {
    const { name, image, storeId } = data

    const result = await pool.query(`
        INSERT INTO categories (name, image, store_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [name, image, storeId])

    return result.rows[0] || null
}

export async function updateCategoryById(data) {
    const { name, image, id, storeId } = data

    const result = await pool.query(`
        UPDATE categories
        SET name = $1,
            image = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3 AND store_id = $4
        RETURNING *
    `, [name, image, id, storeId])

    return result.rows[0] || null
}

export async function updateCategoryStatus(data) {
    const { isActive, id, storeId } = data

    const result = await pool.query(`
        UPDATE categories
        SET is_active = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2 AND store_id = $3
        RETURNING *
    `, [isActive, id, storeId])

    return result.rows[0] || null
}

export async function findActiveCategoryOptions(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT id, name
        FROM categories
        WHERE is_active = true AND store_id = $1
        ORDER BY name
    `, [storeId])

    return result.rows
}

export async function findCategoryByName(data) {
    const { name, storeId } = data

    const result = await pool.query(`
        SELECT id, name
        FROM categories
        WHERE name = $1 AND store_id = $2
    `, [name, storeId])

    return result.rows[0] || null
}
