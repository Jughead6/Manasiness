import pool from "../../src/config/db2.js";

export async function insertPlayground(req, res) {
    const { name, image } = req.body

    try {
        const response = await pool.query(`
            INSERT INTO categories (name)
            VALUES ($1)
            RETURNING *
            `, [ name])
        res.status(201).json({ message: "Insert successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}