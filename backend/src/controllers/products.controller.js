import pool from '../config/db.js'

export async function getProducts(req, res) {
    try {
        const result = await pool.query(`
            SELECT products.*, categories.name AS category
            FROM products
            JOIN categories ON products.category_id = categories.id
        `)
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message})   
    }
}

export async function getProductsById(req, res) {
    const { id } = req.params

    try {
        const response = await pool.query(`
            SELECT 
                products.id,
                products.name,
                products.image,
                products.description,
                products.cost_price,
                products.sale_price,
                products.stock_product,
                categories.name AS category
            FROM products
            JOIN categories ON categories.id = products.category_id
            WHERE products.id = $1
        `, [id])

        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}