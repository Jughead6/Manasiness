import pool from "../../config/db.js"

export async function findAllSales(data) {
    const { orderDirection, storeId } = data

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
        WHERE sales.store_id = $1
        ORDER BY sales.sold_at ${orderDirection}
    `, [storeId])

    return result.rows
}

export async function insertSale(data) {
    const { product_id, user_id, quantity, state, storeId } = data

    const result = await pool.query(`
        INSERT INTO sales (product_id, user_id, sale_price, quantity, state, store_id)
        SELECT $1, $2, products.sale_price, $3, $4, $5
        FROM products
        WHERE products.id = $1 AND products.store_id = $5
        RETURNING *
    `, [product_id, user_id, quantity, state, storeId])

    return result.rows[0] || null
}
