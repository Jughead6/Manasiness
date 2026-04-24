import pool from "../../config/db.js"

export async function findAllStaff(data) {
    const { orderDirection, limit, rowOffset, storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT
            staff.id,
            staff.created_at AS date,
            users.name AS worker,
            staff.salary,
            staff.state
        FROM staff
        JOIN users ON staff.user_id = users.id AND staff.store_id = users.store_id
        WHERE staff.store_id = $1
            AND staff.created_at >= (CURRENT_DATE - ($4 * INTERVAL '1 day'))
            AND staff.created_at < (CURRENT_DATE - ($4 * INTERVAL '1 day') + INTERVAL '1 day')
        ORDER BY staff.created_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [storeId, limit, rowOffset, dayOffset])

    return result.rows
}

export async function getStaffTotalRows(data) {
    const { storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM staff
        WHERE store_id = $1
            AND created_at >= (CURRENT_DATE - ($2 * INTERVAL '1 day'))
            AND created_at < (CURRENT_DATE - ($2 * INTERVAL '1 day') + INTERVAL '1 day')
    `, [storeId, dayOffset])

    return result.rows[0]
}

export async function getStaffWindowInfo(data) {
    const { storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT
            target_day AS start_date,
            target_day AS end_date,
            EXISTS (
                SELECT 1
                FROM staff
                WHERE store_id = $1
                    AND created_at < target_day
            ) AS has_older,
            ($2 > 0) AS has_newer
        FROM (
            SELECT (CURRENT_DATE - ($2 * INTERVAL '1 day'))::date AS target_day
        ) AS window_data
    `, [storeId, dayOffset])

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
