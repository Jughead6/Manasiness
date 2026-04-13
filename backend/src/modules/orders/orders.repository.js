import pool from "../../config/db.js"
import { conflict, notFound } from "../../errors/http-errors.js"

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
        JOIN products ON orders.product_id = products.id AND orders.store_id = products.store_id
        JOIN users ON orders.user_id = users.id AND orders.store_id = users.store_id
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
    const client = await pool.connect()

    try {
        await client.query("BEGIN")

        const productResult = await client.query(`
            SELECT id, cost_price, is_active
            FROM products
            WHERE id = $1 AND store_id = $2
            FOR UPDATE
        `, [product_id, storeId])

        const product = productResult.rows[0]

        if (!product) {
            throw notFound("Product not found")
        }

        if (!product.is_active) {
            throw conflict("Product unavailable")
        }

        const orderResult = await client.query(`
            INSERT INTO orders (product_id, user_id, cost_price, quantity, state, store_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [product_id, user_id, product.cost_price, quantity, state, storeId])

        if (state === "paid") {
            await client.query(`
                UPDATE products
                SET stock = stock + $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2 AND store_id = $3
            `, [quantity, product_id, storeId])
        }

        await client.query("COMMIT")
        return orderResult.rows[0]
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    } finally {
        client.release()
    }
}