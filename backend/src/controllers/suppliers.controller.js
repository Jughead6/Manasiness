import pool2 from '../config/db2.js'

export async function getSuppliers(req, res) {
    try {
        const response = await pool2.query(`
            SELECT id, name, image
            FROM users
            WHERE role = 'supplier'
            ORDER BY id ASC
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getSuppliersById(req, res) {
    const { id } = req.params

    try {
        const response = await pool2.query(`
            SELECT
                orders.ordered_at AS date,
                products.name AS product,
                orders.cost_price AS price,
                orders.quantity,
                orders.state,
                users.name
            FROM orders
            JOIN users ON orders.user_id = users.id
            JOIN products ON orders.product_id = products.id
            WHERE orders.user_id = $1
            ORDER BY orders.id ASC
        `, [id])

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}