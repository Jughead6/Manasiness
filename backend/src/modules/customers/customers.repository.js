import pool from "../../config/db.js"

export async function findAllCustomers() {
    const result = await pool.query(`
        SELECT id, name, image
        FROM users
        WHERE role = 'customer'
        ORDER BY id ASC
    `)

    return result.rows
}

export async function findCustomerBaseById(id) {
    const result = await pool.query(`
        SELECT id, name, image, phone, role, created_at, updated_at, is_active
        FROM users
        WHERE id = $1 AND role = 'customer'
    `, [id])

    return result.rows[0] || null
}

export async function findCustomerRowsById(id, orderDirection, limit, offset) {
    const result = await pool.query(`
        SELECT
            sales.id,
            sales.sold_at AS date,
            products.name AS product,
            sales.sale_price AS price,
            sales.quantity,
            sales.state
        FROM sales
        JOIN products ON sales.product_id = products.id
        WHERE sales.user_id = $1
        ORDER BY sales.sold_at ${orderDirection}
        LIMIT $2 OFFSET $3
    `, [id, limit, offset])

    return result.rows
}

export async function findActiveCustomersOptions() {
    const result = await pool.query(`
        SELECT id, name
        FROM users
        WHERE role = 'customer' AND is_active = true
        ORDER BY name
    `)

    return result.rows
}

export async function getCustomerTotalRows(id) {
    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM sales
        WHERE user_id = $1
    `, [id])

    return result.rows[0]
}