import pool from "../../src/config/db2.js";

export async function putEdit(req, res) {
    try {
        const { id } = req.params
        const { name } = req.body

        const response = await pool.query(`
            UPDATE categories
            SET name = $1
            WHERE id = $2
        `, [ name, id])
        res.status(200).json({ message: "Edit successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
} 