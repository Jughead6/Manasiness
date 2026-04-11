import pool from "../../config/db.js"

export async function findAllUsers(data) {
    const { storeId, search = "" } = data
    const cleanSearch = search.trim()
    const searchValue = `%${cleanSearch}%`

    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE store_id = $1
            AND (
                $2 = ''
                OR name ILIKE $3
                OR phone ILIKE $3
                OR role ILIKE $3
            )
        ORDER BY id ASC
    `, [storeId, cleanSearch, searchValue])

    return result.rows
}

export async function findUserById(data) {
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE id = $1 AND store_id = $2
    `, [id, storeId])

    return result.rows[0] || null
}

export async function insertUser(data) {
    const { name, image, phone, role, storeId } = data

    const result = await pool.query(`
        INSERT INTO users (name, image, phone, role, store_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `, [name, image, phone, role, storeId])

    return result.rows[0] || null
}

export async function updateUserById(data) {
    const { name, image, phone, role, id, storeId } = data

    const result = await pool.query(`
        UPDATE users
        SET name = $1,
            image = $2,
            phone = $3,
            role = $4,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $5 AND store_id = $6
        RETURNING *
    `, [name, image, phone, role, id, storeId])

    return result.rows[0] || null
}

export async function updateUserStatus(data) {
    const { isActive, id, storeId } = data

    const result = await pool.query(`
        UPDATE users
        SET is_active = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2 AND store_id = $3
        RETURNING *
    `, [isActive, id, storeId])

    return result.rows[0] || null
}
