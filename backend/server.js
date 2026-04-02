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


app.listen(3000, () => {
    console.log("Servidor corriendo")
})
