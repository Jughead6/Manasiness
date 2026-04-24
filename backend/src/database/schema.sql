CREATE TABLE stores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    phone TEXT UNIQUE CHECK (phone IS NULL OR phone ~ '^\+[1-9][0-9]{7,14}$'),
    currency_code TEXT NOT NULL DEFAULT 'PEN' CHECK(currency_code IN ('PEN', 'USD', 'EUR', 'MXN', 'COP', 'CLP', 'ARS', 'BRL')),
    currency_symbol TEXT NOT NULL DEFAULT 'S/',
    image TEXT DEFAULT 'https://i.postimg.cc/DzKtGYCx/nouserphoto.png'
);

CREATE TABLE categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    name TEXT NOT NULL CHECK(length(trim(name)) > 0),
    image TEXT DEFAULT 'https://i.postimg.cc/KYydTs9w/noimage.png',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    UNIQUE (store_id, name),
    UNIQUE (store_id, id)
);

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    name TEXT NOT NULL CHECK(length(trim(name)) > 0),
    image TEXT DEFAULT 'https://i.postimg.cc/DzKtGYCx/nouserphoto.png',
    phone TEXT CHECK(phone IS NULL OR phone ~ '^\+[1-9][0-9]{7,14}$'),
    role TEXT NOT NULL CHECK(role IN ('customer', 'worker', 'supplier')),
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    UNIQUE (store_id, phone),
    UNIQUE (store_id, id)
);

CREATE UNIQUE INDEX users_one_default_by_role
ON users(store_id, role)
WHERE is_default = TRUE;

CREATE OR REPLACE FUNCTION create_default_users_for_store()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users (store_id, name, phone, role, is_default)
    VALUES
        (NEW.id, 'Unknown Customer', NULL, 'customer', TRUE),
        (NEW.id, 'Unknown Supplier', NULL, 'supplier', TRUE),
        (NEW.id, 'Unknown Worker', NULL, 'worker', TRUE);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stores_create_default_users
AFTER INSERT ON stores
FOR EACH ROW
EXECUTE FUNCTION create_default_users_for_store();

CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL CHECK(length(trim(name)) > 0),
    image TEXT DEFAULT 'https://i.postimg.cc/KYydTs9w/noimage.png',
    cost_price NUMERIC NOT NULL CHECK(cost_price >= 0),
    sale_price NUMERIC NOT NULL CHECK(sale_price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (store_id, category_id) REFERENCES categories(store_id, id),
    UNIQUE (store_id, name),
    UNIQUE (store_id, id)
);

CREATE TABLE sales (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    sale_price NUMERIC NOT NULL CHECK(sale_price > 0),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    sold_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (store_id, product_id) REFERENCES products(store_id, id),
    FOREIGN KEY (store_id, user_id) REFERENCES users(store_id, id)
);

CREATE TABLE orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    cost_price NUMERIC NOT NULL CHECK(cost_price > 0),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (store_id, product_id) REFERENCES products(store_id, id),
    FOREIGN KEY (store_id, user_id) REFERENCES users(store_id, id)
);

CREATE TABLE staff (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    salary NUMERIC NOT NULL CHECK(salary > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (store_id, user_id) REFERENCES users(store_id, id)
);

CREATE OR REPLACE FUNCTION prevent_pending_for_default_users()
RETURNS TRIGGER AS $$
DECLARE
    default_user BOOLEAN;
BEGIN
    SELECT is_default INTO default_user
    FROM users
    WHERE id = NEW.user_id AND store_id = NEW.store_id;

    IF default_user = TRUE AND NEW.state = 'pending' THEN
        RAISE EXCEPTION 'Invalid state for default user';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sales_prevent_pending_default_user
BEFORE INSERT OR UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION prevent_pending_for_default_users();

CREATE TRIGGER orders_prevent_pending_default_user
BEFORE INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION prevent_pending_for_default_users();

CREATE TRIGGER staff_prevent_pending_default_user
BEFORE INSERT OR UPDATE ON staff
FOR EACH ROW
EXECUTE FUNCTION prevent_pending_for_default_users();

CREATE TABLE email_verification_codes (
    email TEXT PRIMARY KEY,
    code_hash TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


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

CREATE TABLE password_reset_codes (
    email TEXT PRIMARY KEY,
    code_hash TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
