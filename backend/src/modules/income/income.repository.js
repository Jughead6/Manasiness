import pool from "../../config/db.js"

export async function findIncomeByWeek(data) {
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
                FROM sales
                CROSS JOIN range_week r
                WHERE store_id = $1
                AND state = 'paid'
                AND sold_at::date < r.start_date

                UNION ALL

                SELECT 1
                FROM orders
                CROSS JOIN range_week r
                WHERE store_id = $1
                AND state = 'paid'
                AND ordered_at::date < r.start_date
            ) AS has_older
        )
        SELECT
            movement.day,
            COALESCE(SUM(movement.total_sold), 0) - COALESCE(SUM(movement.total_spent), 0) AS total,
            r.start_date,
            r.end_date,
            o.has_older
        FROM (
            SELECT
                sold_at::date AS day,
                SUM(sale_price * quantity) AS total_sold,
                0::numeric AS total_spent
            FROM sales
            CROSS JOIN range_week r
            WHERE store_id = $1
            AND state = 'paid'
            AND sold_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY sold_at::date

            UNION ALL

            SELECT
                ordered_at::date AS day,
                0::numeric AS total_sold,
                SUM(cost_price * quantity) AS total_spent
            FROM orders
            CROSS JOIN range_week r
            WHERE store_id = $1
            AND state = 'paid'
            AND ordered_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY ordered_at::date
        ) AS movement
        CROSS JOIN range_week r
        CROSS JOIN older o
        GROUP BY movement.day, r.start_date, r.end_date, o.has_older
        ORDER BY movement.day ASC;
    `, [storeId, offset])

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