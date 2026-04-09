import pool from "../../config/db.js"

export async function findAllCategories() {
    const result = await pool.query(`
        SELECT id, name, image, created_at, updated_at, is_active
        FROM categories
        ORDER BY id ASC
    `)

    return result.rows
}

export async function findCategoryById(id) {
    const result = await pool.query(`
        SELECT id, name, image, created_at, updated_at, is_active
        FROM categories
        WHERE id = $1
    `, [id])

    return result.rows[0] || null
}

export async function insertCategory(data) {
    const { name } = data

    const result = await pool.query(`
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
    `, [name])

    return result.rows[0] || null
}

export async function updateCategoryById(id, data) {
    const { name, image } = data

    const result = await pool.query(`
        UPDATE categories
        SET name = $1,
            image = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
    `, [name, image, id])

    return result.rows[0] || null
}

export async function updateCategoryStatus(id, isActive) {
    const result = await pool.query(`
        UPDATE categories
        SET is_active = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
    `, [isActive, id])

    return result.rows[0] || null
}

export async function findActiveCategoryOptions() {
    const result = await pool.query(`
        SELECT id, name
        FROM categories
        WHERE is_active = true
        ORDER BY name
    `)

    return result.rows
}