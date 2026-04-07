import pool2 from '../config/db2.js'

export async function getCategories(req, res) {
    try {
        const result = await pool2.query(`
            SELECT id, name, image, created_at, updated_at, is_active
            FROM categories
            ORDER BY id ASC
        `)

        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getCategoryId(req, res) {
    const { id } = req.params

    try {
        const response = await pool2.query(`
            SELECT id, name, image, created_at, updated_at, is_active
            FROM categories
            WHERE id = $1
        `, [id])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' })
        }

        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function createCategory(req, res) {
    const { name } = req.body

    try {
        const response = await pool2.query(`
            INSERT INTO categories (name)
            VALUES ($1)
            RETURNING *
        `, [name])

        res.status(201).json({
            message: 'Create successfully',
            category: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function editCategory(req, res) {
    const { id } = req.params
    const { name, image } = req.body

    try {
        const response = await pool2.query(`
            UPDATE categories
            SET name = $1,
                image = $2,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `, [name, image, id])

        console.log('UPDATED CATEGORY:', response.rows[0])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' })
        }

        res.status(200).json({
            message: 'Edit successfully',
            category: response.rows[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}