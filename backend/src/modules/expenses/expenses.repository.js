import pool from "../../config/db.js"

export async function findExpensesByWeek(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            day,
            COALESCE(SUM(total_orders), 0) AS total_orders,
            COALESCE(SUM(total_staff), 0) AS total_staff,
            COALESCE(SUM(total_orders), 0) + COALESCE(SUM(total_staff), 0) AS total
        FROM (
            SELECT
                ordered_at::date AS day,
                SUM(cost_price * quantity) AS total_orders,
                0::numeric AS total_staff
            FROM orders
            WHERE store_id = $1
            AND state = 'paid'
            AND ordered_at::date BETWEEN CURRENT_DATE - 6 AND CURRENT_DATE
            GROUP BY ordered_at::date

            UNION ALL

            SELECT
                created_at::date AS day,
                0::numeric AS total_orders,
                SUM(salary) AS total_staff
            FROM staff
            WHERE store_id = $1
            AND state = 'paid'
            AND created_at::date BETWEEN CURRENT_DATE - 6 AND CURRENT_DATE
            GROUP BY created_at::date
        ) AS movement
        GROUP BY day
        ORDER BY day ASC;
    `, [storeId])

    return result.rows
}

export async function findExpensesByDay(data) {
    const { storeId, date } = data

    const result = await pool.query(`
        SELECT
            COALESCE(SUM(total_orders), 0) AS total_orders,
            COALESCE(SUM(total_staff), 0) AS total_staff,
            COALESCE(SUM(total_orders), 0) + COALESCE(SUM(total_staff), 0) AS total
        FROM (
            SELECT
                SUM(cost_price * quantity) AS total_orders,
                0::numeric AS total_staff
            FROM orders
            WHERE store_id = $1
            AND state = 'paid'
            AND ordered_at::date = $2

            UNION ALL

            SELECT
                0::numeric AS total_orders,
                SUM(salary) AS total_staff
            FROM staff
            WHERE store_id = $1
            AND state = 'paid'
            AND created_at::date = $2
        ) AS movement;
    `, [storeId, date])

    return result.rows[0]
}