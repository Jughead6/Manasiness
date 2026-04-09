import pool from "../../config/db.js"

export async function findAllSales(orderDirection) {
    const result = await pool.query(`
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
        ORDER BY sales.sold_at ${orderDirection}
    `)

    return result.rows
}

export async function insertSale(data) {
    const { product_id, user_id, quantity, state } = data

    const result = await pool.query(`
        INSERT INTO sales (product_id, user_id, sale_price, quantity, state)
        SELECT $1, $2, products.sale_price, $3, $4
        FROM products
        WHERE products.id = $1
        RETURNING *
    `, [product_id, user_id, quantity, state])

    return result.rows[0] || null
}
