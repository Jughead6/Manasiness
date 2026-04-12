import pool from "../../config/db.js"

export async function findSalesStatsSummary(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            COALESCE(SUM(sale_price * quantity) FILTER (
                WHERE sold_at::date = CURRENT_DATE
            ), 0) AS day_total,
            COUNT(*) FILTER (
                WHERE sold_at::date = CURRENT_DATE
            ) AS day_count,

            COALESCE(SUM(sale_price * quantity) FILTER (
                WHERE sold_at >= date_trunc('week', CURRENT_DATE)
            ), 0) AS week_total,
            COUNT(*) FILTER (
                WHERE sold_at >= date_trunc('week', CURRENT_DATE)
            ) AS week_count,

            COALESCE(SUM(sale_price * quantity) FILTER (
                WHERE sold_at >= date_trunc('month', CURRENT_DATE)
            ), 0) AS month_total,
            COUNT(*) FILTER (
                WHERE sold_at >= date_trunc('month', CURRENT_DATE)
            ) AS month_count
        FROM sales
        WHERE store_id = $1
        AND state = 'paid'
    `, [storeId])

    return {
        dayTotal: Number(result.rows[0].day_total),
        dayCount: Number(result.rows[0].day_count),
        weekTotal: Number(result.rows[0].week_total),
        weekCount: Number(result.rows[0].week_count),
        monthTotal: Number(result.rows[0].month_total),
        monthCount: Number(result.rows[0].month_count)
    }
}

export async function findOrdersStatsSummary(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            COALESCE(SUM(cost_price * quantity) FILTER (
                WHERE ordered_at::date = CURRENT_DATE
            ), 0) AS day_total,
            COUNT(*) FILTER (
                WHERE ordered_at::date = CURRENT_DATE
            ) AS day_count,

            COALESCE(SUM(cost_price * quantity) FILTER (
                WHERE ordered_at >= date_trunc('week', CURRENT_DATE)
            ), 0) AS week_total,
            COUNT(*) FILTER (
                WHERE ordered_at >= date_trunc('week', CURRENT_DATE)
            ) AS week_count,

            COALESCE(SUM(cost_price * quantity) FILTER (
                WHERE ordered_at >= date_trunc('month', CURRENT_DATE)
            ), 0) AS month_total,
            COUNT(*) FILTER (
                WHERE ordered_at >= date_trunc('month', CURRENT_DATE)
            ) AS month_count
        FROM orders
        WHERE store_id = $1
        AND state = 'paid'
    `, [storeId])

    return {
        dayTotal: Number(result.rows[0].day_total),
        dayCount: Number(result.rows[0].day_count),
        weekTotal: Number(result.rows[0].week_total),
        weekCount: Number(result.rows[0].week_count),
        monthTotal: Number(result.rows[0].month_total),
        monthCount: Number(result.rows[0].month_count)
    }
}

export async function findStaffStatsSummary(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT
            COALESCE(SUM(salary) FILTER (
                WHERE created_at::date = CURRENT_DATE
            ), 0) AS day_total,
            COUNT(*) FILTER (
                WHERE created_at::date = CURRENT_DATE
            ) AS day_count,

            COALESCE(SUM(salary) FILTER (
                WHERE created_at >= date_trunc('week', CURRENT_DATE)
            ), 0) AS week_total,
            COUNT(*) FILTER (
                WHERE created_at >= date_trunc('week', CURRENT_DATE)
            ) AS week_count,

            COALESCE(SUM(salary) FILTER (
                WHERE created_at >= date_trunc('month', CURRENT_DATE)
            ), 0) AS month_total,
            COUNT(*) FILTER (
                WHERE created_at >= date_trunc('month', CURRENT_DATE)
            ) AS month_count
        FROM staff
        WHERE store_id = $1
        AND state = 'paid'
    `, [storeId])

    return {
        dayTotal: Number(result.rows[0].day_total),
        dayCount: Number(result.rows[0].day_count),
        weekTotal: Number(result.rows[0].week_total),
        weekCount: Number(result.rows[0].week_count),
        monthTotal: Number(result.rows[0].month_total),
        monthCount: Number(result.rows[0].month_count)
    }
}