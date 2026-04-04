import pool from '../config/db.js'

export async function getCustomers(req, res) {
    try {
        const response = await pool.query(`
            SELECT name, image, id
            FROM users
            WHERE role = 'CUSTOMER'
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getCustomersById(req, res) {
    const { id } = req.params

    try {
        const response = await pool.query(`
            SELECT sales.date, sales.price, sales.quantity, sales.state, sales.product_id AS product, users.name
            FROM sales
            JOIN users ON sales.user_id = users.id
            WHERE sales.user_id = $1
        `, [id])

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}