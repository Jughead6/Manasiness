CREATE TABLE categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE CHECK(length(trim(name)) > 0),
    image TEXT DEFAULT 'https://i.postimg.cc/KYydTs9w/noimage.png',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL UNIQUE CHECK(length(trim(name)) > 0),
    image TEXT DEFAULT 'https://i.postimg.cc/KYydTs9w/noimage.png',
    cost_price NUMERIC NOT NULL CHECK(cost_price >= 0),
    sale_price NUMERIC NOT NULL CHECK(sale_price >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL CHECK(length(trim(name)) > 0),
    image TEXT DEFAULT 'https://i.postimg.cc/DzKtGYCx/nouserphoto.png',
    phone TEXT NOT NULL UNIQUE CHECK(phone ~ '^[0-9]{9}$'),
    role TEXT NOT NULL CHECK(role IN ('customer', 'worker', 'supplier')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE sales (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    sale_price NUMERIC NOT NULL CHECK(sale_price > 0),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    sold_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    cost_price NUMERIC NOT NULL CHECK(cost_price > 0),
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE staff (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL,
    salary NUMERIC NOT NULL CHECK(salary > 0),
    state TEXT NOT NULL CHECK(state IN ('pending', 'paid', 'canceled')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);