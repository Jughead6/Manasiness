import pool from "../../config/db.js"

export async function findAllWorkers(data) {
    const { storeId, search = "" } = data
    const cleanSearch = search.trim()
    const searchValue = `%${cleanSearch}%`

    const result = await pool.query(`
        SELECT id, name, image
        FROM users
        WHERE role = 'worker'
            AND store_id = $1
            AND (
                $2 = ''
                OR name ILIKE $3
                OR phone ILIKE $3
            )
        ORDER BY id ASC
    `, [storeId, cleanSearch, searchValue])

    return result.rows
}

export async function findWorkerBaseById(data) {
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE id = $1 AND role = 'worker' AND store_id = $2
    `, [id, storeId])

    return result.rows[0] || null
}

export async function findWorkerRowsById(data) {
    const { id, limit, offset, orderDirection, storeId } = data

    const result = await pool.query(`
        SELECT
            staff.id,
            staff.created_at AS date,
            staff.salary,
            staff.state
        FROM staff
        WHERE staff.user_id = $1 AND staff.store_id = $4
        ORDER BY staff.created_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [id, limit, offset, storeId])

    return result.rows
}

export async function findActiveWorkersOptions(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT id, name
        FROM users
        WHERE role = 'worker' AND is_active = true AND store_id = $1
        ORDER BY name
    `, [storeId])

    return result.rows
}

export async function getWorkerTotalRows(data) {
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM staff
        WHERE user_id = $1 AND store_id = $2
    `, [id, storeId])

    return result.rows[0]
}
