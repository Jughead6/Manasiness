import pool from "../../config/db.js"
import { conflict, notFound } from "../../errors/http-errors.js"

export async function findAllSales(data) {
    const { orderDirection, limit, rowOffset, storeId, dayOffset } = data

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
        JOIN products ON sales.product_id = products.id AND sales.store_id = products.store_id
        JOIN users ON sales.user_id = users.id AND sales.store_id = users.store_id
        WHERE sales.store_id = $1
            AND sales.sold_at >= (CURRENT_DATE - ($4 * INTERVAL '1 day'))
            AND sales.sold_at < (CURRENT_DATE - ($4 * INTERVAL '1 day') + INTERVAL '1 day')
        ORDER BY sales.sold_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [storeId, limit, rowOffset, dayOffset])

    return result.rows
}

export async function getSalesTotalRows(data) {
    const { storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM sales
        WHERE store_id = $1
            AND sold_at >= (CURRENT_DATE - ($2 * INTERVAL '1 day'))
            AND sold_at < (CURRENT_DATE - ($2 * INTERVAL '1 day') + INTERVAL '1 day')
    `, [storeId, dayOffset])

    return result.rows[0]
}

export async function getSalesWindowInfo(data) {
    const { storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT
            target_day AS start_date,
            target_day AS end_date,
            EXISTS (
                SELECT 1
                FROM sales
                WHERE store_id = $1
                    AND sold_at < target_day
            ) AS has_older,
            ($2 > 0) AS has_newer
        FROM (
            SELECT (CURRENT_DATE - ($2 * INTERVAL '1 day'))::date AS target_day
        ) AS window_data
    `, [storeId, dayOffset])

    return result.rows[0]
}

export async function insertSale(data) {
    const { product_id, user_id, quantity, state, storeId } = data
    const client = await pool.connect()

    try {
        await client.query("BEGIN")

        const productResult = await client.query(`
            SELECT id, sale_price, stock, is_active
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

        if (state === "paid" && Number(product.stock) < quantity) {
            throw conflict("Insufficient stock")
        }

        const saleResult = await client.query(`
            INSERT INTO sales (product_id, user_id, sale_price, quantity, state, store_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [product_id, user_id, product.sale_price, quantity, state, storeId])

        if (state === "paid") {
            await client.query(`
                UPDATE products
                SET stock = stock - $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2 AND store_id = $3
            `, [quantity, product_id, storeId])
        }

        await client.query("COMMIT")
        return saleResult.rows[0]
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    } finally {
        client.release()
    }
}
