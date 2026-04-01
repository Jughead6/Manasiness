import express from "express"
import pkg from "pg"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pkg
const app = express()

app.use(express.json())

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.use(cors())

app.get("/categories", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories')
        res.json(result.rows)
    } catch ( error ) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(3000, () => {
    console.log("Servidor corriendo")
})
