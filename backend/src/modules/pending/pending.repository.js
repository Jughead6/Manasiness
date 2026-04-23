import pool from "../../config/db.js"
import { conflict, notFound } from "../../errors/http-errors.js"

function mapPendingSummary(row) {
    return {
        count: Number(row?.total_count ?? 0),
        total: Number(row?.total_amount ?? 0)
    }
}

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

export async function findCustomersPendingSummary(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            COUNT(*) AS total_count,
            COALESCE(SUM(sales.sale_price * sales.quantity), 0) AS total_amount
        FROM sales
        JOIN users
            ON users.id = sales.user_id
            AND users.store_id = sales.store_id
        WHERE sales.store_id = $1
        AND sales.state = 'pending'
        AND users.role = 'customer'
    `, [storeId])

    return mapPendingSummary(result.rows[0])
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

export async function findSuppliersPendingSummary(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            COUNT(*) AS total_count,
            COALESCE(SUM(orders.cost_price * orders.quantity), 0) AS total_amount
        FROM orders
        JOIN users
            ON users.id = orders.user_id
            AND users.store_id = orders.store_id
        WHERE orders.store_id = $1
        AND orders.state = 'pending'
        AND users.role = 'supplier'
    `, [storeId])

    return mapPendingSummary(result.rows[0])
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

export async function findStaffPendingSummary(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            COUNT(*) AS total_count,
            COALESCE(SUM(staff.salary), 0) AS total_amount
        FROM staff
        JOIN users
            ON users.id = staff.user_id
            AND users.store_id = staff.store_id
        WHERE staff.store_id = $1
        AND staff.state = 'pending'
        AND users.role = 'worker'
    `, [storeId])

    return mapPendingSummary(result.rows[0])
}

export async function resolveCustomerPending(data) {
    const { storeId, id, state } = data
    const client = await pool.connect()

    try {
        await client.query("BEGIN")

        const saleResult = await client.query(`
            SELECT id, product_id, quantity, state
            FROM sales
            WHERE id = $1 AND store_id = $2
            FOR UPDATE
        `, [id, storeId])

        const sale = saleResult.rows[0]

        if (!sale) {
            throw notFound("Record not found")
        }

        if (sale.state !== "pending") {
            throw conflict("Action unavailable")
        }

        if (state === "paid") {
            const productResult = await client.query(`
                SELECT id, stock, is_active
                FROM products
                WHERE id = $1 AND store_id = $2
                FOR UPDATE
            `, [sale.product_id, storeId])

            const product = productResult.rows[0]

            if (!product || !product.is_active) {
                throw conflict("Action unavailable")
            }

            if (Number(product.stock) < Number(sale.quantity)) {
                throw conflict("Insufficient stock")
            }

            await client.query(`
                UPDATE products
                SET stock = stock - $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2 AND store_id = $3
            `, [sale.quantity, sale.product_id, storeId])

            const updateResult = await client.query(`
                UPDATE sales
                SET state = $1,
                    sold_at = CURRENT_TIMESTAMP
                WHERE id = $2 AND store_id = $3
                RETURNING *
            `, [state, id, storeId])

            await client.query("COMMIT")
            return updateResult.rows[0]
        }

        const updateResult = await client.query(`
            UPDATE sales
            SET state = $1
            WHERE id = $2 AND store_id = $3
            RETURNING *
        `, [state, id, storeId])

        await client.query("COMMIT")
        return updateResult.rows[0]
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    } finally {
        client.release()
    }
}

export async function resolveSupplierPending(data) {
    const { storeId, id, state } = data
    const client = await pool.connect()

    try {
        await client.query("BEGIN")

        const orderResult = await client.query(`
            SELECT id, product_id, quantity, state
            FROM orders
            WHERE id = $1 AND store_id = $2
            FOR UPDATE
        `, [id, storeId])

        const order = orderResult.rows[0]

        if (!order) {
            throw notFound("Record not found")
        }

        if (order.state !== "pending") {
            throw conflict("Action unavailable")
        }

        if (state === "paid") {
            const productResult = await client.query(`
                SELECT id, is_active
                FROM products
                WHERE id = $1 AND store_id = $2
                FOR UPDATE
            `, [order.product_id, storeId])

            const product = productResult.rows[0]

            if (!product || !product.is_active) {
                throw conflict("Action unavailable")
            }

            await client.query(`
                UPDATE products
                SET stock = stock + $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2 AND store_id = $3
            `, [order.quantity, order.product_id, storeId])

            const updateResult = await client.query(`
                UPDATE orders
                SET state = $1,
                    ordered_at = CURRENT_TIMESTAMP
                WHERE id = $2 AND store_id = $3
                RETURNING *
            `, [state, id, storeId])

            await client.query("COMMIT")
            return updateResult.rows[0]
        }

        const updateResult = await client.query(`
            UPDATE orders
            SET state = $1
            WHERE id = $2 AND store_id = $3
            RETURNING *
        `, [state, id, storeId])

        await client.query("COMMIT")
        return updateResult.rows[0]
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    } finally {
        client.release()
    }
}

export async function resolveWorkerPending(data) {
    const { storeId, id, state } = data
    const client = await pool.connect()

    try {
        await client.query("BEGIN")

        const staffResult = await client.query(`
            SELECT id, state
            FROM staff
            WHERE id = $1 AND store_id = $2
            FOR UPDATE
        `, [id, storeId])

        const staff = staffResult.rows[0]

        if (!staff) {
            throw notFound("Record not found")
        }

        if (staff.state !== "pending") {
            throw conflict("Action unavailable")
        }

        if (state === "paid") {
            const updateResult = await client.query(`
                UPDATE staff
                SET state = $1,
                    created_at = CURRENT_TIMESTAMP
                WHERE id = $2 AND store_id = $3
                RETURNING *
            `, [state, id, storeId])

            await client.query("COMMIT")
            return updateResult.rows[0]
        }

        const updateResult = await client.query(`
            UPDATE staff
            SET state = $1
            WHERE id = $2 AND store_id = $3
            RETURNING *
        `, [state, id, storeId])

        await client.query("COMMIT")
        return updateResult.rows[0]
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    } finally {
        client.release()
    }
}
