import pool from "../../config/db.js"

export async function findAllCustomers(data) {
    const { storeId, search = "" } = data
    const cleanSearch = search.trim()
    const searchValue = `%${cleanSearch}%`

    const result = await pool.query(`
        SELECT id, name, image
        FROM users
        WHERE role = 'customer'
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
    const { id, limit, offset, storeId, orderDirection } = data

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
        WHERE sales.user_id = $1 AND sales.store_id = $2
        ORDER BY sales.sold_at ${orderDirection}
        LIMIT $3 OFFSET $4
    `, [id, storeId, limit, offset])

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
    const { id, storeId } = data

    const result = await pool.query(`
        SELECT COUNT(*) AS total_rows
        FROM sales
        WHERE user_id = $1 AND store_id = $2
    `, [id, storeId])

    return result.rows[0]
}
