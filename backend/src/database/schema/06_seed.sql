INSERT INTO users (store_id, name, phone, role, is_default)
SELECT stores.id, default_users.name, NULL, default_users.role, TRUE
FROM stores
CROSS JOIN (
    VALUES
        ('Unknown Customer', 'customer'),
        ('Unknown Supplier', 'supplier'),
        ('Unknown Worker', 'worker')
) AS default_users(name, role)
WHERE NOT EXISTS (
    SELECT 1
    FROM users
    WHERE users.store_id = stores.id
        AND users.role = default_users.role
        AND users.is_default = TRUE
);
