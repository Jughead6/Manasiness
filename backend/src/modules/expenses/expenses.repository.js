import pool from "../../config/db.js"

export async function findExpensesByWeek(data) {
    const { storeId, offset } = data

    const result = await pool.query(`
        WITH base AS (
            SELECT
                (date_trunc('week', CURRENT_DATE)::date - 1) AS base_end
        ),
        range_week AS (
            SELECT
                (base_end - ($2::int * 7) - 6) AS start_date,
                (base_end - ($2::int * 7)) AS end_date
            FROM base
        ),
        older AS (
            SELECT EXISTS (
                SELECT 1
                FROM orders
                CROSS JOIN range_week r
                WHERE store_id = $1
                AND state = 'paid'
                AND ordered_at::date < r.start_date

                UNION ALL

                SELECT 1
                FROM staff
                CROSS JOIN range_week r
                WHERE store_id = $1
                AND state = 'paid'
                AND created_at::date < r.start_date
            ) AS has_older
        )
        SELECT
            movement.day,
            COALESCE(SUM(movement.total_orders), 0) AS total_orders,
            COALESCE(SUM(movement.total_staff), 0) AS total_staff,
            COALESCE(SUM(movement.total_orders), 0) + COALESCE(SUM(movement.total_staff), 0) AS total,
            r.start_date,
            r.end_date,
            o.has_older
        FROM (
            SELECT
                ordered_at::date AS day,
                SUM(cost_price * quantity) AS total_orders,
                0::numeric AS total_staff
            FROM orders
            CROSS JOIN range_week r
            WHERE store_id = $1
            AND state = 'paid'
            AND ordered_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY ordered_at::date

            UNION ALL

            SELECT
                created_at::date AS day,
                0::numeric AS total_orders,
                SUM(salary) AS total_staff
            FROM staff
            CROSS JOIN range_week r
            WHERE store_id = $1
            AND state = 'paid'
            AND created_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY created_at::date
        ) AS movement
        CROSS JOIN range_week r
        CROSS JOIN older o
        GROUP BY movement.day, r.start_date, r.end_date, o.has_older
        ORDER BY movement.day ASC;
    `, [storeId, offset])

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