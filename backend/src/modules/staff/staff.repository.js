import pool from "../../config/db.js"

export async function findAllStaff(data) {
    const { orderDirection, limit, offset, storeId } = data

    const result = await pool.query(`
        SELECT
            staff.id,
            staff.created_at AS date,
            users.name AS worker,
            staff.salary,
            staff.state
        FROM staff
        JOIN users ON staff.user_id = users.id
        WHERE staff.store_id = $1
        ORDER BY staff.created_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [storeId, limit, offset])

    return result.rows
}

export async function getStaffTotalRows(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM staff
        WHERE store_id = $1
    `, [storeId])

    return result.rows[0]
}

export async function insertStaff(data) {
    const { user_id, salary, state, storeId } = data

    const result = await pool.query(`
        INSERT INTO staff (user_id, salary, state, store_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [user_id, salary, state, storeId])

    return result.rows[0] || null
}