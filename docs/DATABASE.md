# Database

Manasiness uses PostgreSQL.

The database is made thinking in small stores. Each store has their own information, so the most important column in many tables is `store_id`.

## Main idea

The project is multi-store.

That means one database can save many stores, but each store should only see their own data.

Example:

```txt
store 1 → products, categories, users, sales
store 2 → products, categories, users, sales
```

The backend should always filter using `store_id` in protected modules.

## Main tables

### stores

This table saves the account of each store.

Important fields:

- `id`
- `name`
- `email`
- `password_hash`
- `phone`
- `image`
- `created_at`
- `updated_at`

This table is used for authentication and store profile information.

## categories

Categories help organize products.

Important fields:

- `id`
- `store_id`
- `name`
- `image`
- `is_active`
- `created_at`
- `updated_at`

A category belongs to one store.

The best rule is that a store should not have repeated category names.

## products

Products are the main inventory data.

Important fields:

- `id`
- `store_id`
- `category_id`
- `name`
- `image`
- `cost_price`
- `sale_price`
- `stock`
- `is_active`
- `created_at`
- `updated_at`

A product belongs to one store and one category.

The stock should never be negative.

## users

Users are people related with the store.

In this project a user can be:

```txt
customer
supplier
worker
```

Important fields:

- `id`
- `store_id`
- `name`
- `phone`
- `image`
- `role`
- `is_active`
- `created_at`
- `updated_at`

The role is important because sales, orders and staff payments should use the correct type of user.

## sales

Sales register products sold to customers.

Important fields:

- `id`
- `store_id`
- `product_id`
- `user_id`
- `quantity`
- `sale_price`
- `state`
- `sold_at`

The normal rule is:

```txt
paid sale → decrease stock
pending sale → not decrease stock yet
canceled sale → not decrease stock
```

## orders

Orders register products bought from suppliers.

Important fields:

- `id`
- `store_id`
- `product_id`
- `user_id`
- `quantity`
- `cost_price`
- `state`
- `ordered_at`

The normal rule is:

```txt
paid order → increase stock
pending order → not increase stock yet
canceled order → not increase stock
```

## staff

Staff registers payments to workers.

Important fields:

- `id`
- `store_id`
- `user_id`
- `amount`
- `state`
- `paid_at`

This is useful for expenses and pending payments.

## states

The movement tables can use states like:

```txt
paid
pending
canceled
```

This helps the app separate real money movements from pending ones.

## Soft delete

Some tables use `is_active` instead of deleting rows directly.

This is useful because the app can keep history and avoid breaking old sales or orders.

Example:

```txt
is_active = false
```

## Indexes

Indexes are important because almost all queries filter by `store_id`.

Recommended indexes:

```sql
CREATE INDEX idx_categories_store_id ON categories(store_id);
CREATE INDEX idx_products_store_id ON products(store_id);
CREATE INDEX idx_users_store_id ON users(store_id);
CREATE INDEX idx_sales_store_id ON sales(store_id);
CREATE INDEX idx_orders_store_id ON orders(store_id);
CREATE INDEX idx_staff_store_id ON staff(store_id);
```

Also, for reports, dates are important:

```sql
CREATE INDEX idx_sales_store_sold_at ON sales(store_id, sold_at);
CREATE INDEX idx_orders_store_ordered_at ON orders(store_id, ordered_at);
CREATE INDEX idx_staff_store_paid_at ON staff(store_id, paid_at);
```

## Unique rules

The app should avoid repeated data inside the same store.

Example:

```sql
UNIQUE(store_id, name)
```

This can be used in categories and products depending of the final rule.

For store account:

```sql
UNIQUE(email)
```

## Triggers

Triggers are useful for automatic fields like `updated_at`.

Example idea:

```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

Then it can be connected to tables that have `updated_at`.

```sql
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
```

## Transactions

Transactions are important for sales and orders.

Example for a paid sale:

```txt
1. validate product exists
2. validate stock is enough
3. create sale
4. decrease stock
5. commit transaction
```

If something fails, everything should rollback.

This avoids having a sale saved but stock not updated.

## Backend rule

The backend should not trust data from the frontend.

Even if the frontend sends a `product_id`, the backend still must validate:

- product exists
- product belongs to the same store
- user exists
- user belongs to the same store
- user has the correct role
- quantity and prices are valid

## Report queries

The stats module uses PostgreSQL aggregations to get totals by day, week and month.

Example idea:

```txt
sales today total
sales week total
sales month total
```

This is better than calculating all in the frontend.

## Important note

The database is one of the most important parts of Manasiness.

If the database is well organized, the frontend and backend are easier to maintain.
