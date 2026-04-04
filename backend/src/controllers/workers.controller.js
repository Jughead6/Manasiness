import pool from '../config/db.js'

export async function getWorkers(req, res) {
    try {
        const response = await pool.query(`
            SELECT name, image, id
            FROM users
            WHERE role = 'WORKER'
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getWorkersById(req, res) {
    const { id } = req.params

    try {
        const response = await pool.query(`
            SELECT staff.date, staff.salary, staff.state, users.name
            FROM staff
            JOIN users ON staff.user_id = users.id
            WHERE staff.user_id = $1
        `, [id])

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}