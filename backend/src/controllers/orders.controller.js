import pool2 from '../config/db2.js'

export async function getOrders(req, res) {
    try {
        const response = await pool2.query(`
            SELECT
                orders.id,
                orders.ordered_at AS date,
                products.name AS product,
                users.name AS supplier,
                orders.cost_price AS price,
                orders.quantity,
                orders.state
            FROM orders
            JOIN products ON orders.product_id = products.id
            JOIN users ON orders.user_id = users.id
            ORDER BY orders.id ASC
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function registerOrder(req, res) {
    const { product_id, user_id, quantity, state } = req.body

    try {
        const response = await pool2.query(`
            INSERT INTO orders (product_id, user_id, cost_price, quantity, state)
            SELECT $1, $2, products.cost_price, $3, $4
            FROM products
            WHERE products.id = $1
            RETURNING *
        `, [product_id, user_id, quantity, state])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' })
        }

        res.status(201).json({
            message: 'Register successfully',
            order: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}