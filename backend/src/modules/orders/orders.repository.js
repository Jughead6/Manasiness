import pool from "../../config/db.js"

export async function findAllOrders(data) {
    const { orderDirection, limit, offset, storeId } = data

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
        WHERE orders.store_id = $1
        ORDER BY orders.ordered_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [storeId, limit, offset])

    return result.rows
}

export async function getOrdersTotalRows(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM orders
        WHERE store_id = $1
    `, [storeId])

    return result.rows[0]
}

export async function insertOrder(data) {
    const { product_id, user_id, quantity, state, storeId } = data

    const result = await pool.query(`
        INSERT INTO orders (product_id, user_id, cost_price, quantity, state, store_id)
        SELECT $1, $2, products.cost_price, $3, $4, $5
        FROM products
        WHERE products.id = $1 AND products.store_id = $5
        RETURNING *
    `, [product_id, user_id, quantity, state, storeId])

    return result.rows[0] || null
}