import pool from "../../config/db.js"

export async function findAllSuppliers() {
    const result = await pool.query(`
        SELECT id, name, image
        FROM users
        WHERE role = 'supplier'
        ORDER BY id ASC
    `)

    return result.rows
}

export async function findSupplierBaseById(id) {
    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE id = $1 AND role = 'supplier'
    `, [id])

    return result.rows[0] || null
}

export async function findSupplierRowsById(id, orderDirection, limit, offset) {
    const result = await pool.query(`
        SELECT
            orders.id,
            orders.ordered_at AS date,
            products.name AS product,
            orders.cost_price AS price,
            orders.quantity,
            orders.state
        FROM orders
        JOIN products ON orders.product_id = products.id
        WHERE orders.user_id = $1
        ORDER BY orders.ordered_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [id, limit, offset])

    return result.rows
}

export async function findActiveSuppliersOptions() {
    const result = await pool.query(`
        SELECT id, name
        FROM users
        WHERE role = 'supplier' AND is_active = true
        ORDER BY name
    `)

    return result.rows
}

export async function getSupplierTotalRows(id) {
    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM orders
        WHERE user_id = $1
    `, [id])

    return result.rows[0]
}