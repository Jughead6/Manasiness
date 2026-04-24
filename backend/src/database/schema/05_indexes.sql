CREATE UNIQUE INDEX users_one_default_by_role_idx
ON users(store_id, role)
WHERE is_default = TRUE;

CREATE UNIQUE INDEX categories_store_name_unique_idx
ON categories(store_id, lower(name));

CREATE UNIQUE INDEX products_store_name_unique_idx
ON products(store_id, lower(name));

CREATE INDEX categories_store_status_id_idx
ON categories(store_id, is_active, id);

CREATE INDEX categories_store_active_name_idx
ON categories(store_id, name)
WHERE is_active = TRUE;

CREATE INDEX categories_name_trgm_idx
ON categories USING GIN (name gin_trgm_ops);

CREATE INDEX users_store_status_role_id_idx
ON users(store_id, is_active, role, id);

CREATE INDEX users_store_role_active_name_idx
ON users(store_id, role, is_active, is_default DESC, name);

CREATE INDEX users_name_trgm_idx
ON users USING GIN (name gin_trgm_ops);

CREATE INDEX users_phone_trgm_idx
ON users USING GIN (phone gin_trgm_ops);

CREATE INDEX products_store_status_id_idx
ON products(store_id, is_active, id);

CREATE INDEX products_store_category_id_idx
ON products(store_id, category_id, id);

CREATE INDEX products_store_active_name_idx
ON products(store_id, name)
WHERE is_active = TRUE;

CREATE INDEX products_name_trgm_idx
ON products USING GIN (name gin_trgm_ops);

CREATE INDEX sales_store_sold_at_idx
ON sales(store_id, sold_at DESC);

CREATE INDEX sales_store_user_sold_at_idx
ON sales(store_id, user_id, sold_at DESC);

CREATE INDEX sales_store_product_sold_at_idx
ON sales(store_id, product_id, sold_at DESC);

CREATE INDEX sales_store_paid_sold_at_idx
ON sales(store_id, sold_at DESC)
WHERE state = 'paid';

CREATE INDEX sales_store_pending_sold_at_idx
ON sales(store_id, sold_at ASC)
WHERE state = 'pending';

CREATE INDEX orders_store_ordered_at_idx
ON orders(store_id, ordered_at DESC);

CREATE INDEX orders_store_user_ordered_at_idx
ON orders(store_id, user_id, ordered_at DESC);

CREATE INDEX orders_store_product_ordered_at_idx
ON orders(store_id, product_id, ordered_at DESC);

CREATE INDEX orders_store_paid_ordered_at_idx
ON orders(store_id, ordered_at DESC)
WHERE state = 'paid';

CREATE INDEX orders_store_pending_ordered_at_idx
ON orders(store_id, ordered_at ASC)
WHERE state = 'pending';

CREATE INDEX staff_store_created_at_idx
ON staff(store_id, created_at DESC);

CREATE INDEX staff_store_user_created_at_idx
ON staff(store_id, user_id, created_at DESC);

CREATE INDEX staff_store_paid_created_at_idx
ON staff(store_id, created_at DESC)
WHERE state = 'paid';

CREATE INDEX staff_store_pending_created_at_idx
ON staff(store_id, created_at ASC)
WHERE state = 'pending';

CREATE INDEX email_verification_codes_expires_at_idx
ON email_verification_codes(expires_at);

CREATE INDEX password_reset_codes_expires_at_idx
ON password_reset_codes(expires_at);
