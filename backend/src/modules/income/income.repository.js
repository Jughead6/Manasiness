import pool from "../../config/db.js"

export async function findIncomeByWeek(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            day,
            COALESCE(SUM(total_sold), 0) - COALESCE(SUM(total_spent), 0) AS total
        FROM (
            SELECT
                sold_at::date AS day,
                SUM(sale_price * quantity) AS total_sold,
                0::numeric AS total_spent
            FROM sales
            WHERE store_id = $1
            AND state = 'paid'
            AND sold_at::date BETWEEN CURRENT_DATE - 6 AND CURRENT_DATE
            GROUP BY sold_at::date

            UNION ALL

            SELECT
                ordered_at::date AS day,
                0::numeric AS total_sold,
                SUM(cost_price * quantity) AS total_spent
            FROM orders
            WHERE store_id = $1
            AND state = 'paid'
            AND ordered_at::date BETWEEN CURRENT_DATE - 6 AND CURRENT_DATE
            GROUP BY ordered_at::date
        ) AS movement
        GROUP BY day
        ORDER BY day ASC;
    `, [storeId])

    return result.rows
}

export async function findIncomeByDay(data) {
    const { storeId, date } = data

    const result = await pool.query(`
        SELECT
            COALESCE(SUM(total_sold), 0) AS total_sold,
            COALESCE(SUM(total_spent), 0) AS total_spent,
            COALESCE(SUM(total_sold), 0) - COALESCE(SUM(total_spent), 0) AS net_income
        FROM (
            SELECT
                SUM(sale_price * quantity) AS total_sold,
                0::numeric AS total_spent
            FROM sales
            WHERE store_id = $1
            AND state = 'paid'
            AND sold_at::date = $2

            UNION ALL

            SELECT
                0::numeric AS total_sold,
                SUM(cost_price * quantity) AS total_spent
            FROM orders
            WHERE store_id = $1
            AND state = 'paid'
            AND ordered_at::date = $2
        ) AS movement;
    `, [storeId, date])

    return result.rows[0]
}