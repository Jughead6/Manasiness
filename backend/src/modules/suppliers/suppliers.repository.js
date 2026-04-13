import pool from "../../config/db.js"

export async function findAllSuppliers(data) {
    const { storeId, search = "" } = data
    const cleanSearch = search.trim()
    const searchValue = `%${cleanSearch}%`

    const result = await pool.query(`
        SELECT id, name, image
        FROM users
        WHERE role = 'supplier'
            AND store_id = $1
            AND (
                $2 = ''
                OR name ILIKE $3
                OR phone ILIKE $3
            )
        ORDER BY id ASC
    `, [storeId, cleanSearch, searchValue])

    return result.rows
}

export async function findSupplierBaseById(data) {
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE id = $1 AND role = 'supplier' AND store_id = $2
    `, [id, storeId])

    return result.rows[0] || null
}

export async function findSupplierRowsById(data) {
    const { id, limit, offset, orderDirection, storeId } = data

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
        WHERE orders.user_id = $1 AND orders.store_id = $4
        ORDER BY orders.ordered_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [id, limit, offset, storeId])

    return result.rows
}

export async function findActiveSuppliersOptions(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT id, name
        FROM users
        WHERE role = 'supplier' AND is_active = true AND store_id = $1
        ORDER BY name
    `, [storeId])

    return result.rows
}

export async function getSupplierTotalRows(data) {
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM orders
        WHERE user_id = $1 AND store_id = $2
    `, [id, storeId])

    return result.rows[0]
}