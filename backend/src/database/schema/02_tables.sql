CREATE TABLE stores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL CHECK(length(trim(name)) > 0),
    email TEXT NOT NULL UNIQUE CHECK(email = lower(email) AND email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
    password_hash TEXT NOT NULL,
    phone TEXT UNIQUE CHECK(phone IS NULL OR phone ~ '^\+[1-9][0-9]{7,14}$'),
    currency_code TEXT NOT NULL DEFAULT 'PEN' CHECK(currency_code IN ('PEN', 'USD', 'EUR', 'MXN', 'COP', 'CLP', 'ARS', 'BRL')),
    currency_symbol TEXT NOT NULL DEFAULT 'S/',
    image TEXT NOT NULL DEFAULT 'https://i.postimg.cc/DzKtGYCx/nouserphoto.png',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CHECK(
        (currency_code = 'PEN' AND currency_symbol = 'S/')
        OR (currency_code = 'USD' AND currency_symbol = '$')
        OR (currency_code = 'EUR' AND currency_symbol = '€')
        OR (currency_code = 'MXN' AND currency_symbol = '$')
        OR (currency_code = 'COP' AND currency_symbol = '$')
        OR (currency_code = 'CLP' AND currency_symbol = '$')
        OR (currency_code = 'ARS' AND currency_symbol = '$')
        OR (currency_code = 'BRL' AND currency_symbol = 'R$')
    )
);

CREATE TABLE categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    name TEXT NOT NULL CHECK(length(trim(name)) > 0),
    image TEXT NOT NULL DEFAULT 'https://i.postimg.cc/KYydTs9w/noimage.png',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE (store_id, id)
);

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    name TEXT NOT NULL CHECK(length(trim(name)) > 0),
    image TEXT NOT NULL DEFAULT 'https://i.postimg.cc/DzKtGYCx/nouserphoto.png',
    phone TEXT CHECK(phone IS NULL OR phone ~ '^\+[1-9][0-9]{7,14}$'),
    role TEXT NOT NULL CHECK(role IN ('customer', 'worker', 'supplier')),
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE (store_id, phone),
    UNIQUE (store_id, id)
);

CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL CHECK(length(trim(name)) > 0),
    image TEXT NOT NULL DEFAULT 'https://i.postimg.cc/KYydTs9w/noimage.png',
    cost_price NUMERIC(12, 2) NOT NULL CHECK(cost_price >= 0),
    sale_price NUMERIC(12, 2) NOT NULL CHECK(sale_price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id, category_id) REFERENCES categories(store_id, id),
    UNIQUE (store_id, id)
);

CREATE TABLE sales (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    sale_price NUMERIC(12, 2) NOT NULL CHECK(sale_price > 0),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    sold_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id, product_id) REFERENCES products(store_id, id),
    FOREIGN KEY (store_id, user_id) REFERENCES users(store_id, id)
);

CREATE TABLE orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    cost_price NUMERIC(12, 2) NOT NULL CHECK(cost_price > 0),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id, product_id) REFERENCES products(store_id, id),
    FOREIGN KEY (store_id, user_id) REFERENCES users(store_id, id)
);

CREATE TABLE staff (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    store_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    salary NUMERIC(12, 2) NOT NULL CHECK(salary > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id, user_id) REFERENCES users(store_id, id)
);

CREATE TABLE email_verification_codes (
    email TEXT PRIMARY KEY CHECK(email = lower(email) AND email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
    code_hash TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_codes (
    email TEXT PRIMARY KEY CHECK(email = lower(email) AND email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
    code_hash TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
