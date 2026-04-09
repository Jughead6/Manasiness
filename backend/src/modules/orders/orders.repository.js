import pool from "../../config/db.js"

export async function findAllOrders(orderDirection) {
    const result = await pool.query(`
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
        ORDER BY orders.ordered_at ${orderDirection}
    `)

    return result.rows
}

export async function insertOrder(data) {
    const { product_id, user_id, quantity, state } = data

    const result = await pool.query(`
        INSERT INTO orders (product_id, user_id, cost_price, quantity, state)
        SELECT $1, $2, products.cost_price, $3, $4
        FROM products
        WHERE products.id = $1
        RETURNING *
    `, [product_id, user_id, quantity, state])

    return result.rows[0] || null
}
