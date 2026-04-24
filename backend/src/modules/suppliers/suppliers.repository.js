import pool from "../../config/db.js"

export async function findAllSuppliers(data) {
    const { storeId, search = "", status = "all" } = data
    const cleanSearch = search.trim()
    const searchValue = `%${cleanSearch}%`
    const isActive = status === "active" ? true : status === "inactive" ? false : null

    const result = await pool.query(`
        SELECT id, name, image, phone, is_active
        FROM users
        WHERE role = 'supplier'
            AND store_id = $1
            AND (
                $2 = ''
                OR name ILIKE $3
                OR phone ILIKE $3
            )
            AND ($4::boolean IS NULL OR is_active = $4)
        ORDER BY id ASC
    `, [storeId, cleanSearch, searchValue, isActive])

    return result.rows
}

export async function findSupplierBaseById(data) {
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT id, name
        FROM users
        WHERE id = $1 AND role = 'supplier' AND store_id = $2
    `, [id, storeId])

    return result.rows[0] || null
}

export async function findSupplierRowsById(data) {
    const { id, limit, rowOffset, orderDirection, storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT
            orders.id,
            orders.ordered_at AS date,
            products.name AS product,
            orders.cost_price AS price,
            orders.quantity,
            orders.state
        FROM orders
        JOIN products ON orders.product_id = products.id AND orders.store_id = products.store_id
        WHERE orders.user_id = $1
            AND orders.store_id = $2
            AND orders.ordered_at >= (CURRENT_DATE - ($5 * INTERVAL '1 day'))
            AND orders.ordered_at < (CURRENT_DATE - ($5 * INTERVAL '1 day') + INTERVAL '1 day')
        ORDER BY orders.ordered_at ${orderDirection}
        LIMIT $3 OFFSET $4
    `, [id, storeId, limit, rowOffset, dayOffset])

    return result.rows
}

export async function findActiveSuppliersOptions(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT id, name, is_default
        FROM users
        WHERE role = 'supplier' AND is_active = true AND store_id = $1
        ORDER BY is_default DESC, name
    `, [storeId])

    return result.rows
}

export async function getSupplierTotalRows(data) {
    const { id, storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM orders
        WHERE user_id = $1
            AND store_id = $2
            AND ordered_at >= (CURRENT_DATE - ($3 * INTERVAL '1 day'))
            AND ordered_at < (CURRENT_DATE - ($3 * INTERVAL '1 day') + INTERVAL '1 day')
    `, [id, storeId, dayOffset])

    return result.rows[0]
}

export async function getSupplierWindowInfo(data) {
    const { id, storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT
            target_day AS start_date,
            target_day AS end_date,
            EXISTS (
                SELECT 1
                FROM orders
                WHERE user_id = $1
                    AND store_id = $2
                    AND ordered_at < target_day
            ) AS has_older,
            ($3 > 0) AS has_newer
        FROM (
            SELECT (CURRENT_DATE - ($3 * INTERVAL '1 day'))::date AS target_day
        ) AS window_data
    `, [id, storeId, dayOffset])

    return result.rows[0]
}
