import pool from '../config/db.js'

export async function getStaff(req, res) {
    try {
        const response = await pool.query(`
            SELECT *
            FROM staff
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}