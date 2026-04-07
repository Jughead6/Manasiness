import pool2 from "../config/db2.js"

export async function getUsers(req, res) {
    try {
        const response = await pool2.query(`
            SELECT id, name, image, phone, role, created_at, updated_at, is_active
            FROM users
            ORDER BY id ASC
        `)

        res.json(response.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getUserById(req, res) {
    const { id } = req.params

    try {
        const response = await pool2.query(`
            SELECT id, name, image, phone, role, created_at, updated_at, is_active
            FROM users
            WHERE id = $1
        `, [id])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function createUser(req, res) {
    const { name, phone, role } = req.body

    try {
        const response = await pool2.query(`
            INSERT INTO users (name, phone, role)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [name, phone, role])

        res.status(201).json({
            message: 'Create successfully',
            user: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function editUser(req, res) {
    const { id } = req.params
    const { name, image, phone, role } = req.body

    try {
        const response = await pool2.query(`
            UPDATE users
            SET name = $1,
                image = $2,
                phone = $3,
                role = $4
            WHERE id = $5
            RETURNING *
        `, [name, image, phone, role, id])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json({
            message: 'Edit successfully',
            user: response.rows[0]
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function deactivateUser(req, res) {
    const { id } = req.params

    try {
        const response = await pool2.query(`
            UPDATE users
            SET is_active = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *
        `, ['false', id])

        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json({
            message: 'User deactivated successfully',
            category: response.rows[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}