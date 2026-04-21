import pool from "../../config/db.js"

export async function findGrowthRate(data) {
    const { storeId, offset, activityDateFilter } = data

    const result = await pool.query(`
        WITH base AS (
            SELECT
                CASE
                    WHEN $3 = 'month' THEN (date_trunc('month', CURRENT_DATE)::date - 1)
                    ELSE (date_trunc('week', CURRENT_DATE)::date - 1)
                END AS base_end
        ),
        range_date AS (
            SELECT
                CASE
                    WHEN $3 = 'month' THEN date_trunc('month', (base_end - ($2::int * INTERVAL '1 month')))::date
                    ELSE (base_end - ($2::int * 7) - 6)
                END AS start_date,
                CASE
                    WHEN $3 = 'month' THEN (date_trunc('month', (base_end - ($2::int * INTERVAL '1 month'))) + INTERVAL '1 month' - INTERVAL '1 day')::date
                    ELSE (base_end - ($2::int * 7))
                END AS end_date
            FROM base
        ),
        previous_range_date AS (
            SELECT
                CASE
                    WHEN $3 = 'month' THEN date_trunc('month', (r.start_date - INTERVAL '1 day'))::date
                    ELSE (r.start_date - 7)
                END AS start_date,
                (r.start_date - 1) AS end_date
            FROM range_date r
        ),
        older AS (
            SELECT EXISTS (
                SELECT 1
                FROM sales
                CROSS JOIN range_date r
                WHERE store_id = $1
                AND state = 'paid'
                AND sold_at::date < r.start_date
            ) AS has_older
        ),
        current_period AS (
            SELECT
                COALESCE(SUM(s.sale_price * s.quantity), 0) AS total
            FROM sales s
            CROSS JOIN range_date r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
        ),
        previous_period AS (
            SELECT
                COALESCE(SUM(s.sale_price * s.quantity), 0) AS total
            FROM sales s
            CROSS JOIN previous_range_date r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
        )
        SELECT
            r.start_date,
            r.end_date,
            o.has_older,
            CASE
                WHEN pp.total = 0 AND cp.total = 0 THEN 0
                WHEN pp.total = 0 THEN 100
                ELSE ROUND(((cp.total - pp.total) / pp.total) * 100, 2)
            END AS growth_rate
        FROM range_date r
        CROSS JOIN older o
        CROSS JOIN current_period cp
        CROSS JOIN previous_period pp;
    `, [storeId, offset, activityDateFilter])

    return result.rows[0]
}

export async function findDayPerformance(data) {
    const { storeId, offset, activityDateFilter } = data

    const result = await pool.query(`
        WITH base AS (
            SELECT
                CASE
                    WHEN $3 = 'month' THEN (date_trunc('month', CURRENT_DATE)::date - 1)
                    ELSE (date_trunc('week', CURRENT_DATE)::date - 1)
                END AS base_end
        ),
        range_date AS (
            SELECT
                CASE
                    WHEN $3 = 'month' THEN date_trunc('month', (base_end - ($2::int * INTERVAL '1 month')))::date
                    ELSE (base_end - ($2::int * 7) - 6)
                END AS start_date,
                CASE
                    WHEN $3 = 'month' THEN (date_trunc('month', (base_end - ($2::int * INTERVAL '1 month'))) + INTERVAL '1 month' - INTERVAL '1 day')::date
                    ELSE (base_end - ($2::int * 7))
                END AS end_date
            FROM base
        ),
        older AS (
            SELECT EXISTS (
                SELECT 1
                FROM sales
                CROSS JOIN range_date r
                WHERE store_id = $1
                AND state = 'paid'
                AND sold_at::date < r.start_date
            ) AS has_older
        ),
        sales_by_day AS (
            SELECT
                s.sold_at::date AS day,
                SUM(s.sale_price * s.quantity) AS total
            FROM sales s
            CROSS JOIN range_date r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY s.sold_at::date
        )
        SELECT
            r.start_date,
            r.end_date,
            o.has_older,
            (
                SELECT day
                FROM sales_by_day
                ORDER BY total DESC, day ASC
                LIMIT 1
            ) AS best_day_date,
            (
                SELECT day
                FROM sales_by_day
                ORDER BY total ASC, day ASC
                LIMIT 1
            ) AS worst_day_date
        FROM range_date r
        CROSS JOIN older o;
    `, [storeId, offset, activityDateFilter])

    return result.rows[0]
}

export async function findCatalogPerformance(data) {
    const { storeId, offset, activityDateFilter, catalogOption } = data

    const result = await pool.query(`
        WITH base AS (
            SELECT
                CASE
                    WHEN $3 = 'month' THEN (date_trunc('month', CURRENT_DATE)::date - 1)
                    ELSE (date_trunc('week', CURRENT_DATE)::date - 1)
                END AS base_end
        ),
        range_date AS (
            SELECT
                CASE
                    WHEN $3 = 'month' THEN date_trunc('month', (base_end - ($2::int * INTERVAL '1 month')))::date
                    ELSE (base_end - ($2::int * 7) - 6)
                END AS start_date,
                CASE
                    WHEN $3 = 'month' THEN (date_trunc('month', (base_end - ($2::int * INTERVAL '1 month'))) + INTERVAL '1 month' - INTERVAL '1 day')::date
                    ELSE (base_end - ($2::int * 7))
                END AS end_date
            FROM base
        ),
        older AS (
            SELECT EXISTS (
                SELECT 1
                FROM sales
                CROSS JOIN range_date r
                WHERE store_id = $1
                AND state = 'paid'
                AND sold_at::date < r.start_date
            ) AS has_older
        ),
        product_sales AS (
            SELECT
                p.id,
                p.name,
                p.image,
                SUM(s.quantity) AS total_quantity
            FROM sales s
            INNER JOIN products p
                ON p.id = s.product_id
                AND p.store_id = s.store_id
            CROSS JOIN range_date r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY p.id, p.name, p.image
        ),
        category_sales AS (
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
            CROSS JOIN range_date r
            WHERE s.store_id = $1
            AND s.state = 'paid'
            AND s.sold_at::date BETWEEN r.start_date AND r.end_date
            GROUP BY c.id, c.name, c.image
        ),
        selected_product AS (
            SELECT
                id,
                name,
                image,
                total_quantity
            FROM product_sales
            ORDER BY
                CASE WHEN $4 = 'leastSold' THEN total_quantity END ASC,
                CASE WHEN $4 = 'topSold' THEN total_quantity END DESC,
                id ASC
            LIMIT 1
        ),
        selected_category AS (
            SELECT
                id,
                name,
                image,
                total_quantity
            FROM category_sales
            ORDER BY
                CASE WHEN $4 = 'leastSold' THEN total_quantity END ASC,
                CASE WHEN $4 = 'topSold' THEN total_quantity END DESC,
                id ASC
            LIMIT 1
        )
        SELECT
            r.start_date,
            r.end_date,
            o.has_older,
            (
                SELECT id
                FROM selected_product
            ) AS product_id,
            (
                SELECT name
                FROM selected_product
            ) AS product_name,
            (
                SELECT image
                FROM selected_product
            ) AS product_image,
            (
                SELECT total_quantity
                FROM selected_product
            ) AS product_total_quantity,
            (
                SELECT id
                FROM selected_category
            ) AS category_id,
            (
                SELECT name
                FROM selected_category
            ) AS category_name,
            (
                SELECT image
                FROM selected_category
            ) AS category_image,
            (
                SELECT total_quantity
                FROM selected_category
            ) AS category_total_quantity
        FROM range_date r
        CROSS JOIN older o;
    `, [storeId, offset, activityDateFilter, catalogOption])

    return result.rows[0]
}