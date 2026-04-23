import pool from "../../config/db.js"

export async function findAllCustomers(data) {
    const { storeId, search = "", status = "all" } = data
    const cleanSearch = search.trim()
    const searchValue = `%${cleanSearch}%`
    const isActive = status === "active" ? true : status === "inactive" ? false : null

    const result = await pool.query(`
        SELECT id, name, image, phone, is_active
        FROM users
        WHERE role = 'customer'
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

export async function findCustomerBaseById(data) {
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE id = $1 AND role = 'customer' AND store_id = $2
    `, [id, storeId])

    return result.rows[0] || null
}

export async function findCustomerRowsById(data) {
    const { id, limit, rowOffset, storeId, orderDirection, dayOffset } = data

    const result = await pool.query(`
        SELECT
            sales.id,
            sales.sold_at AS date,
            products.name AS product,
            sales.sale_price AS price,
            sales.quantity,
            sales.state
        FROM sales
        JOIN products ON sales.product_id = products.id AND sales.store_id = products.store_id
        WHERE sales.user_id = $1
            AND sales.store_id = $2
            AND sales.sold_at >= (CURRENT_DATE - ($5 * INTERVAL '1 day'))
            AND sales.sold_at < (CURRENT_DATE - ($5 * INTERVAL '1 day') + INTERVAL '1 day')
        ORDER BY sales.sold_at ${orderDirection}
        LIMIT $3 OFFSET $4
    `, [id, storeId, limit, rowOffset, dayOffset])

    return result.rows
}

export async function findActiveCustomersOptions(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT id, name
        FROM users
        WHERE role = 'customer' AND is_active = true AND store_id = $1
        ORDER BY name
    `, [storeId])

    return result.rows
}

export async function getCustomerTotalRows(data) {
    const { id, storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM sales
        WHERE user_id = $1
            AND store_id = $2
            AND sold_at >= (CURRENT_DATE - ($3 * INTERVAL '1 day'))
            AND sold_at < (CURRENT_DATE - ($3 * INTERVAL '1 day') + INTERVAL '1 day')
    `, [id, storeId, dayOffset])

    return result.rows[0]
}

export async function getCustomerWindowInfo(data) {
    const { id, storeId, dayOffset } = data

    const result = await pool.query(`
        SELECT
            target_day AS start_date,
            target_day AS end_date,
            EXISTS (
                SELECT 1
                FROM sales
                WHERE user_id = $1
                    AND store_id = $2
                    AND sold_at < target_day
            ) AS has_older,
            ($3 > 0) AS has_newer
        FROM (
            SELECT (CURRENT_DATE - ($3 * INTERVAL '1 day'))::date AS target_day
        ) AS window_data
    `, [id, storeId, dayOffset])

    return result.rows[0]
}
