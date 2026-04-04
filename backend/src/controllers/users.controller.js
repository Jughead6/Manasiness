import pool from '../config/db.js'

export async function getUsers(req, res) {
    try {
        const response = await pool.query("SELECT * FROM users")
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}


export async function getUsersById(req, res) {
    const { id } = req.params

    try {
        const response = await pool.query(`
            SELECT id, name, image, phone, role
            FROM users
            WHERE id = $1
        `, [id])

        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}