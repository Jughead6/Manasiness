import pool2 from "../config/db2.js"

export async function getSales(req, res) {
    try {
        const response = await pool2.query(`
            SELECT
                sales.id,
                sales.sold_at AS date,
                products.name AS product,
                users.name AS customer,
                sales.sale_price AS price,
                sales.quantity,
                sales.state
            FROM sales
            JOIN products ON sales.product_id = products.id
            JOIN users ON sales.user_id = users.id
            ORDER BY sales.id ASC
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function registerSale(req, res) {
    const { product_id, user_id, quantity, state } = req.body

    try {
        const response = await pool2.query(`
            INSERT INTO sales (product_id, user_id, sale_price, quantity, state)
            SELECT $1, $2, products.sale_price, $3, $4
            FROM products
            WHERE products.id = $1
            RETURNING *
        `, [product_id, user_id, quantity, state])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' })
        }

        res.status(201).json({
            message: 'Register successfully',
            sale: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}