import pool from '../config/db.js'

export async function getSales(req, res) {
    try {
        const response = await pool.query(`
            SELECT 
                sales.id,
                sales.date,
                products.name AS product,
                users.name AS worker,
                sales.price,
                sales.quantity,
                sales.state
            FROM sales
            JOIN products ON sales.product_id = products.id
            JOIN users ON sales.user_id = users.id
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}