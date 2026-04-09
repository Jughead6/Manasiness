import pool from "../../config/db.js"

export async function findAllWorkers() {
    const result = await pool.query(`
        SELECT id, name, image
        FROM users
        WHERE role = 'worker'
        ORDER BY id ASC
    `)

    return result.rows
}

export async function findWorkerBaseById(id) {
    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE id = $1 AND role = 'worker'
    `, [id])

    return result.rows[0] || null
}

export async function findWorkerRowsById(id, orderDirection, limit, offset) {
    const result = await pool.query(`
        SELECT
            staff.id,
            staff.created_at AS date,
            staff.salary,
            staff.state
        FROM staff
        WHERE staff.user_id = $1
        ORDER BY staff.created_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [id, limit, offset])

    return result.rows
}

export async function findActiveWorkersOptions() {
    const result = await pool.query(`
        SELECT id, name
        FROM users
        WHERE role = 'worker' AND is_active = true
        ORDER BY name
    `)

    return result.rows
}

export async function getWorkerTotalRows(id) {
    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM staff
        WHERE user_id = $1
    `, [id])

    return result.rows[0]
}