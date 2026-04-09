import pool from "../../config/db.js"

export async function findAllUsers() {
    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        ORDER BY id ASC
    `)

    return result.rows
}

export async function findUserById(id) {
    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE id = $1
    `, [id])

    return result.rows[0] || null
}

export async function insertUser(data) {
    const { name, phone, role } = data

    const result = await pool.query(`
        INSERT INTO users (name, phone, role)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [name, phone, role])

    return result.rows[0]
}

export async function updateUserById(id, data) {
    const { name, image, phone, role } = data

    const result = await pool.query(`
        UPDATE users
        SET name = $1,
            image = $2,
            phone = $3,
            role = $4,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $5
        RETURNING *
    `, [name, image, phone, role, id])

    return result.rows[0] || null
}

export async function updateUserStatus(id, isActive) {
    const result = await pool.query(`
        UPDATE users
        SET is_active = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
    `, [isActive, id])

    return result.rows[0] || null
}
