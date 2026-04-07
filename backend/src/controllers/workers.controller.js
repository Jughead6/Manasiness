import pool2 from '../config/db2.js'

export async function getWorkers(req, res) {
    try {
        const response = await pool2.query(`
            SELECT id, name, image
            FROM users
            WHERE role = 'worker'
            ORDER BY id ASC
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getWorkersById(req, res) {
    const { id } = req.params

    try {
        const response = await pool2.query(`
            SELECT
                staff.created_at AS date,
                staff.salary,
                staff.state,
                users.name
            FROM staff
            JOIN users ON staff.user_id = users.id
            WHERE staff.user_id = $1
            ORDER BY staff.id ASC
        `, [id])

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}