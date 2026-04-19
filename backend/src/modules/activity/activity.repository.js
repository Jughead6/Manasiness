import pool from "../../config/db.js"

export async function findGrowthRate(data) {
    const { storeId } = data

    const response = await pool.query(`
        WITH ranges AS (
            SELECT
                (date_trunc('week', CURRENT_DATE)::date - 7) AS start_date,
                (date_trunc('week', CURRENT_DATE)::date - 1) AS end_date,
                (date_trunc('week', CURRENT_DATE)::date - 14) AS previous_start_date,
                (date_trunc('week', CURRENT_DATE)::date - 8) AS previous_end_date
        ),
        current_week AS (
            SELECT
                COALESCE(SUM(s.sale_price * s.quantity), 0) AS total
            FROM sales s
            CROSS JOIN ranges r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
        ),
        previous_week AS (
            SELECT
                COALESCE(SUM(s.sale_price * s.quantity), 0) AS total
            FROM sales s
            CROSS JOIN ranges r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.previous_start_date AND r.previous_end_date
        )
        SELECT
            r.start_date,
            r.end_date,
            CASE
                WHEN pw.total = 0 AND cw.total = 0 THEN 0
                WHEN pw.total = 0 THEN 100
                ELSE ROUND(((cw.total - pw.total) / pw.total) * 100, 2)
            END AS growth_rate
        FROM ranges r
        CROSS JOIN current_week cw
        CROSS JOIN previous_week pw;
    `, [storeId])

    return response.rows[0]
}

export async function findDayPerformance(data) {
    const { storeId } = data

    const response = await pool.query(`
        WITH range_week AS (
            SELECT
                (date_trunc('week', CURRENT_DATE)::date - 7) AS start_date,
                (date_trunc('week', CURRENT_DATE)::date - 1) AS end_date
        ),
        sales_by_day AS (
            SELECT
                s.sold_at::date AS day,
                SUM(s.sale_price * s.quantity) AS total
            FROM sales s
            CROSS JOIN range_week r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY s.sold_at::date
        ),
        best_day AS (
            SELECT day
            FROM sales_by_day
            ORDER BY total DESC, day ASC
            LIMIT 1
        ),
        worst_day AS (
            SELECT day
            FROM sales_by_day
            ORDER BY total ASC, day ASC
            LIMIT 1
        )
        SELECT
            bd.day AS best_day_date,
            wd.day AS worst_day_date
        FROM best_day bd
        CROSS JOIN worst_day wd;
    `, [storeId])

    return response.rows[0]
}

export async function findCatalogPerformance(data) {
    const { storeId } = data

    const response = await pool.query(`
        WITH range_week AS (
            SELECT
                (date_trunc('week', CURRENT_DATE)::date - 7) AS start_date,
                (date_trunc('week', CURRENT_DATE)::date - 1) AS end_date
        ),
        top_product AS (
            SELECT
                p.id,
                p.name,
                p.image,
                SUM(s.quantity) AS total_quantity
            FROM sales s
            INNER JOIN products p
                ON p.id = s.product_id
                AND p.store_id = s.store_id
            CROSS JOIN range_week r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY p.id, p.name, p.image
            ORDER BY total_quantity DESC, p.id ASC
            LIMIT 1
        ),
        top_category AS (
            SELECT
                c.id,
                c.name,
                c.image,
                SUM(s.quantity) AS total_quantity
            FROM sales s
            INNER JOIN products p
                ON p.id = s.product_id
                AND p.store_id = s.store_id
            INNER JOIN categories c
                ON c.id = p.category_id
                AND c.store_id = p.store_id
            CROSS JOIN range_week r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY c.id, c.name, c.image
            ORDER BY total_quantity DESC, c.id ASC
            LIMIT 1
        )
        SELECT
            tp.id AS product_id,
            tp.name AS product_name,
            tp.image AS product_image,
            tp.total_quantity AS product_total_quantity,
            tc.id AS category_id,
            tc.name AS category_name,
            tc.image AS category_image,
            tc.total_quantity AS category_total_quantity
        FROM top_product tp
        CROSS JOIN top_category tc;
    `, [storeId])

    return response.rows[0]
}