import pool from "../../config/db.js"

export async function findAllProducts(data) {
    const { storeId, search = "", status = "all", categoryId = null } = data
    const cleanSearch = search.trim()
    const searchValue = `%${cleanSearch}%`
    const isActive = status === "active" ? true : status === "inactive" ? false : null

    const result = await pool.query(`
        SELECT
            products.id,
            products.name,
            products.image,
            products.cost_price,
            products.sale_price,
            products.stock,
            products.is_active,
            categories.name AS category
        FROM products
        JOIN categories ON products.category_id = categories.id AND products.store_id = categories.store_id
        WHERE products.store_id = $1
            AND (
                $2 = ''
                OR products.name ILIKE $3
                OR categories.name ILIKE $3
            )
            AND ($4::boolean IS NULL OR products.is_active = $4)
            AND ($5::integer IS NULL OR products.category_id = $5)
        ORDER BY products.id ASC
    `, [storeId, cleanSearch, searchValue, isActive, categoryId])

    return result.rows
}

export async function findProductById(data) {
    const { id, storeId } = data

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
        JOIN categories ON categories.id = products.category_id AND categories.store_id = products.store_id
        WHERE products.id = $1 AND products.store_id = $2
    `, [id, storeId])

    return result.rows[0] || null
}

export async function findProductByName(data) {
    const { name, storeId } = data

    const result = await pool.query(`
        SELECT id, name
        FROM products
        WHERE name = $1 AND store_id = $2
    `, [name, storeId])

    return result.rows[0] || null
}

export async function insertProduct(data) {
    const { category_id, name, image, cost_price, sale_price, stock, storeId } = data

    const result = await pool.query(`
        INSERT INTO products (category_id, name, image, cost_price, sale_price, stock, store_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `, [category_id, name, image, cost_price, sale_price, stock, storeId])

    return result.rows[0] || null
}

export async function updateProductById(data) {
    const { category_id, name, image, cost_price, sale_price, stock, id, storeId } = data

    const result = await pool.query(`
        UPDATE products
        SET category_id = $1,
            name = $2,
            image = $3,
            cost_price = $4,
            sale_price = $5,
            stock = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7 AND store_id = $8
        RETURNING *
    `, [category_id, name, image, cost_price, sale_price, stock, id, storeId])

    return result.rows[0] || null
}

export async function updateProductStatus(data) {
    const { isActive, id, storeId } = data

    const result = await pool.query(`
        UPDATE products
        SET is_active = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2 AND store_id = $3
        RETURNING *
    `, [isActive, id, storeId])

    return result.rows[0] || null
}

export async function findActiveProductOptions(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT id, name
        FROM products
        WHERE is_active = true AND store_id = $1
        ORDER BY name
    `, [storeId])

    return result.rows
}
