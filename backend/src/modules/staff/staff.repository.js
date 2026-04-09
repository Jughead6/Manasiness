import pool from "../../config/db.js"

export async function findAllStaff(orderDirection) {
    const result = await pool.query(`
        SELECT
            staff.id,
            staff.created_at AS date,
            users.name AS worker,
            staff.salary,
            staff.state
        FROM staff
        JOIN users ON staff.user_id = users.id
        ORDER BY staff.created_at ${orderDirection}
    `)

    return result.rows
}

export async function insertStaff(data) {
    const { user_id, salary, state } = data

    const result = await pool.query(`
        INSERT INTO staff (user_id, salary, state)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [user_id, salary, state])

    return result.rows[0]
}
