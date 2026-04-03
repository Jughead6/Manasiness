import express from "express"
import cors from "cors"
import pool from "./src/config/db.js"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/categories", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories')
        res.json(result.rows)
    } catch ( error ) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/products", async (req, res) => {
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
})

app.get("/users", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM users")
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

app.get("/sales", async (req, res) => {
    try {
        const response = await pool.query(`
            SELECT 
                sales.id,
                sales.date,
                products.name AS product,
                users.name AS worker,
                sales.price,
                sales.quantity,
                sales.state
            FROM sales
            JOIN products ON sales.product_id = products.id
            JOIN users ON sales.user_id = users.id
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/orders", async (req, res) => {
    try {
        const response = await pool.query(`
            SELECT
                orders.id,
                orders.date,
                products.name AS product,
                users.name AS customer,
                orders.price,
                orders.quantity,
                orders.state
            FROM orders
            JOIN products ON orders.product_id = products.id
            JOIN users ON orders.user_id = users.id
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/staff", async(req, res) => {
    try {
        const response = await pool.query(`
            SELECT *
            FROM staff
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/customers", async (req, res) => {
    try {
        const response = await pool.query(`
            SELECT name, image, id
            FROM users
            WHERE role = 'CUSTOMER'
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/workers", async(req, res) => {
    try {
        const response = await pool.query(`
            SELECT name, image, id
            FROM users
            WHERE role = 'WORKER'
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/suppliers", async(req, res) => {
    try {
        const response = await pool.query(`
            SELECT name, image, id
            FROM users
            WHERE role = 'SUPPLIER'
        `)
        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/categories/:id", async (req, res) => {
    const { id } = req.params

    try {
        const response = await pool.query(`
            SELECT id, name, image, date
            FROM categories
            WHERE id = $1
        `, [id])

        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get("/products/:id", async(req, res) => {
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
})

app.get("/users/:id", async(req, res) => {
    const { id } = req.params

    try {
        const response = await pool.query(`
            SELECT id, name, image, phone, role
            FROM users
            WHERE id = $1
        `, [id])

        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


app.listen(3000, () => {
    console.log("Servidor corriendo")
})
