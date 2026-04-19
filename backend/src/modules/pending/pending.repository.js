import pool from "../../config/db.js"

export async function findCustomersPending(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            sales.id,
            sales.user_id,
            users.name,
            sales.sale_price * sales.quantity AS amount,
            sales.sold_at AS day_ago
        FROM sales
        JOIN users
            ON users.id = sales.user_id
            AND users.store_id = sales.store_id
        WHERE sales.store_id = $1
        AND sales.state = 'pending'
        AND users.role = 'customer'
        ORDER BY sales.sold_at ASC;
    `, [storeId])

    return result.rows
}

export async function findSuppliersPending(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            orders.id,
            orders.user_id,
            users.name,
            orders.cost_price * orders.quantity AS amount,
            orders.ordered_at AS day_ago
        FROM orders
        JOIN users
            ON users.id = orders.user_id
            AND users.store_id = orders.store_id
        WHERE orders.store_id = $1
        AND orders.state = 'pending'
        AND users.role = 'supplier'
        ORDER BY orders.ordered_at ASC;
    `, [storeId])

    return result.rows
}

export async function findStaffPending(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            staff.id,
            staff.user_id,
            users.name,
            staff.salary AS amount,
            staff.created_at AS day_ago
        FROM staff
        JOIN users
            ON users.id = staff.user_id
            AND users.store_id = staff.store_id
        WHERE staff.store_id = $1
        AND staff.state = 'pending'
        AND users.role = 'worker'
        ORDER BY staff.created_at ASC;
    `, [storeId])

    return result.rows
}