import pool2 from '../config/db2.js'

export async function getCustomers(req, res) {
    try {
        const response = await pool2.query(`
            SELECT id, name, image
            FROM users
            WHERE role = 'customer'
            ORDER BY id ASC
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getCustomersById(req, res) {
    const { id } = req.params

    try {
        const response = await pool2.query(`
            SELECT
                sales.sold_at AS date,
                products.name AS product,
                sales.sale_price AS price,
                sales.quantity,
                sales.state,
                users.name
            FROM sales
            JOIN users ON sales.user_id = users.id
            JOIN products ON sales.product_id = products.id
            WHERE sales.user_id = $1
            ORDER BY sales.id ASC
        `, [id])

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}