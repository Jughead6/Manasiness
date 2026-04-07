import pool2 from '../config/db2.js'

export async function getProducts(req, res) {
    try {
        const result = await pool2.query(`
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

        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getProductById(req, res) {
    const { id } = req.params

    try {
        const response = await pool2.query(`
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

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' })
        }

        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function createProduct(req, res) {
    const { category_id, name, cost_price, sale_price, stock } = req.body

    try {
        const response = await pool2.query(`
            INSERT INTO products (category_id, name, cost_price, sale_price, stock)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [category_id, name, cost_price, sale_price, stock])

        res.status(201).json({
            message: 'Create successfully',
            product: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function editProduct(req, res) {
    const { id } = req.params
    const { category_id, name, image, cost_price, sale_price, stock } = req.body

    try {
        const response = await pool2.query(`
            UPDATE products
            SET category_id = $1,
                name = $2,
                image = $3,
                cost_price = $4,
                sale_price = $5,
                stock = $6
            WHERE id = $7
            RETURNING *
        `, [category_id, name, image, cost_price, sale_price, stock, id])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' })
        }

        res.status(200).json({
            message: 'Edit successfully',
            product: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}