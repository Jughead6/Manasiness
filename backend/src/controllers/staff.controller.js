import pool2 from '../config/db2.js'

export async function getStaff(req, res) {
    try {
        const response = await pool2.query(`
            SELECT
                staff.id,
                staff.created_at AS date,
                users.name AS worker,
                staff.salary,
                staff.state
            FROM staff
            JOIN users ON staff.user_id = users.id
            ORDER BY staff.id ASC
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function registerStaff(req, res) {
    const { user_id, salary, state } = req.body

    try {
        const response = await pool2.query(`
            INSERT INTO staff (user_id, salary, state)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [user_id, salary, state])

        res.status(201).json({
            message: 'Register successfully',
            staff: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}