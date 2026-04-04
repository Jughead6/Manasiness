import pool from '../config/db.js'

export async function getCategories(req, res) {
    try {
        const result = await pool.query('SELECT * FROM categories')
        res.json(result.rows)
    } catch ( error ) {
        res.status(500).json({ error: error.message })
    }
}

export async function getCategoriesById(req, res) {
    const { id } = req.params

    try {
        const response = await pool.query(`
            SELECT id, name, image, date
            FROM categories
            WHERE id = $1
        `, [id])

        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}