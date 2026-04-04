import pool from '../config/db.js'

export async function getOrders(req, res) {
    try {
        const response = await pool.query(`
            SELECT
                orders.id,
                orders.date,
                products.name AS product,
                users.name AS customer,
                orders.price,
                orders.quantity,
                orders.state
            FROM orders
            JOIN products ON orders.product_id = products.id
            JOIN users ON orders.user_id = users.id
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}