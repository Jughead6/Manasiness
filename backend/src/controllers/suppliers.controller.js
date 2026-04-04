import pool from '../config/db.js'

export async function getSuppliers(req, res) {
    try {
        const response = await pool.query(`
            SELECT name, image, id
            FROM users
            WHERE role = 'SUPPLIER'
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getSuppliersById(req, res) {
    const { id } = req.params

    try {
        const response = await pool.query(`
            SELECT orders.date, orders.price, orders.quantity, orders.state, orders.product_id AS product, users.name
            FROM orders
            JOIN users ON orders.user_id = users.id
            WHERE orders.user_id = $1
        `, [id])

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

