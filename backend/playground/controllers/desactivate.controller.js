import pool from "../../src/config/db2.js";

export async function patcDesactivate(req, res) {
    try {
        const { id } = req.params
        const { is_active } = req.body

        const response = await pool.query(`
            UPDATE categories
            SET is_active = $1
            WHERE id = $2
        `, [ is_active, id])
        res.status(200).json({ message: "Update successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
} 