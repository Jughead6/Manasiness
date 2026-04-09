import pool from "../../config/db.js"

export async function findAllProducts() {
    const result = await pool.query(`
        SELECT
            products.id,
            products.category_id,
            products.name,
            products.image,
            products.cost_price,
            products.sale_price,
            products.stock,
            products.created_at,
            products.updated_at,
            products.is_active,
            categories.name AS category
        FROM products
        JOIN categories ON products.category_id = categories.id
        ORDER BY products.id ASC
    `)

    return result.rows
}

export async function findProductById(id) {
    const result = await pool.query(`
        SELECT
            products.id,
            products.category_id,
            products.name,
            products.image,
            products.cost_price,
            products.sale_price,
            products.stock,
            products.created_at,
            products.updated_at,
            products.is_active,
            categories.name AS category
        FROM products
        JOIN categories ON categories.id = products.category_id
        WHERE products.id = $1
    `, [id])

    return result.rows[0] || null
}

export async function insertProduct(data) {
    const { category_id, name, cost_price, sale_price, stock } = data

    const result = await pool.query(`
        INSERT INTO products (category_id, name, cost_price, sale_price, stock)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `, [category_id, name, cost_price, sale_price, stock])

    return result.rows[0]
}

export async function updateProductById(id, data) {
    const { category_id, name, image, cost_price, sale_price, stock } = data

    const result = await pool.query(`
        UPDATE products
        SET category_id = $1,
            name = $2,
            image = $3,
            cost_price = $4,
            sale_price = $5,
            stock = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *
    `, [category_id, name, image, cost_price, sale_price, stock, id])

    return result.rows[0] || null
}

export async function updateProductStatus(id, isActive) {
    const result = await pool.query(`
        UPDATE products
        SET is_active = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
    `, [isActive, id])

    return result.rows[0] || null
}

export async function findActiveProductOptions() {
    const result = await pool.query(`
        SELECT id, name
        FROM products
        WHERE is_active = true
        ORDER BY name
    `)

    return result.rows
}
