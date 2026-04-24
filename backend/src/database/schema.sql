                                        CREATE EXTENSION IF NOT EXISTS pg_trgm;
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
                                        CREATE OR REPLACE FUNCTION set_updated_at()
                                        RETURNS TRIGGER AS $$
                                        BEGIN
                                            NEW.updated_at = CURRENT_TIMESTAMP;
                                            RETURN NEW;
                                        END;
                                        $$ LANGUAGE plpgsql;

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

                                        CREATE OR REPLACE FUNCTION protect_default_users()
                                        RETURNS TRIGGER AS $$
                                        BEGIN
                                            IF OLD.is_default = TRUE THEN
                                                RAISE EXCEPTION USING ERRCODE = '23514', MESSAGE = 'Invalid data';
                                            END IF;

                                            RETURN NEW;
                                        END;
                                        $$ LANGUAGE plpgsql;

                                        CREATE OR REPLACE FUNCTION prevent_pending_for_default_users()
                                        RETURNS TRIGGER AS $$
                                        DECLARE
                                            default_user BOOLEAN;
                                        BEGIN
                                            SELECT is_default INTO default_user
                                            FROM users
                                            WHERE id = NEW.user_id AND store_id = NEW.store_id;

                                            IF default_user = TRUE AND NEW.state = 'pending' THEN
                                                RAISE EXCEPTION USING ERRCODE = '23514', MESSAGE = 'Invalid data';
                                            END IF;

                                            RETURN NEW;
                                        END;
                                        $$ LANGUAGE plpgsql;

                                        CREATE OR REPLACE FUNCTION ensure_user_role()
                                        RETURNS TRIGGER AS $$
                                        BEGIN
                                            PERFORM 1
                                            FROM users
                                            WHERE id = NEW.user_id
                                                AND store_id = NEW.store_id
                                                AND role = TG_ARGV[0];

                                            IF NOT FOUND THEN
                                                RAISE EXCEPTION USING ERRCODE = '23514', MESSAGE = 'Invalid data';
                                            END IF;

                                            RETURN NEW;
                                        END;
                                        $$ LANGUAGE plpgsql;

                                        CREATE OR REPLACE FUNCTION change_product_stock(target_store_id INTEGER, target_product_id INTEGER, stock_change INTEGER)
                                        RETURNS VOID AS $$
                                        BEGIN
                                            IF stock_change = 0 THEN
                                                RETURN;
                                            END IF;

                                            IF stock_change < 0 THEN
                                                UPDATE products
                                                SET stock = stock + stock_change
                                                WHERE id = target_product_id
                                                    AND store_id = target_store_id
                                                    AND stock + stock_change >= 0;
                                            ELSE
                                                UPDATE products
                                                SET stock = stock + stock_change
                                                WHERE id = target_product_id
                                                    AND store_id = target_store_id;
                                            END IF;

                                            IF NOT FOUND THEN
                                                RAISE EXCEPTION USING ERRCODE = '23514', MESSAGE = 'Invalid data';
                                            END IF;
                                        END;
                                        $$ LANGUAGE plpgsql;

                                        CREATE OR REPLACE FUNCTION apply_sale_stock()
                                        RETURNS TRIGGER AS $$
                                        BEGIN
                                            IF TG_OP = 'INSERT' THEN
                                                IF NEW.state = 'paid' THEN
                                                    PERFORM change_product_stock(NEW.store_id, NEW.product_id, -NEW.quantity);
                                                END IF;

                                                RETURN NEW;
                                            END IF;

                                            IF OLD.state = 'paid' THEN
                                                PERFORM change_product_stock(OLD.store_id, OLD.product_id, OLD.quantity);
                                            END IF;

                                            IF NEW.state = 'paid' THEN
                                                PERFORM change_product_stock(NEW.store_id, NEW.product_id, -NEW.quantity);
                                            END IF;

                                            RETURN NEW;
                                        END;
                                        $$ LANGUAGE plpgsql;

                                        CREATE OR REPLACE FUNCTION apply_order_stock()
                                        RETURNS TRIGGER AS $$
                                        BEGIN
                                            IF TG_OP = 'INSERT' THEN
                                                IF NEW.state = 'paid' THEN
                                                    PERFORM change_product_stock(NEW.store_id, NEW.product_id, NEW.quantity);
                                                END IF;

                                                RETURN NEW;
                                            END IF;

                                            IF OLD.state = 'paid' THEN
                                                PERFORM change_product_stock(OLD.store_id, OLD.product_id, -OLD.quantity);
                                            END IF;

                                            IF NEW.state = 'paid' THEN
                                                PERFORM change_product_stock(NEW.store_id, NEW.product_id, NEW.quantity);
                                            END IF;

                                            RETURN NEW;
                                        END;
                                        $$ LANGUAGE plpgsql;
                                        CREATE TRIGGER stores_set_updated_at
                                        BEFORE UPDATE ON stores
                                        FOR EACH ROW
                                        EXECUTE FUNCTION set_updated_at();

                                        CREATE TRIGGER categories_set_updated_at
                                        BEFORE UPDATE ON categories
                                        FOR EACH ROW
                                        EXECUTE FUNCTION set_updated_at();

                                        CREATE TRIGGER users_set_updated_at
                                        BEFORE UPDATE ON users
                                        FOR EACH ROW
                                        EXECUTE FUNCTION set_updated_at();

                                        CREATE TRIGGER products_set_updated_at
                                        BEFORE UPDATE ON products
                                        FOR EACH ROW
                                        EXECUTE FUNCTION set_updated_at();

                                        CREATE TRIGGER stores_create_default_users
                                        AFTER INSERT ON stores
                                        FOR EACH ROW
                                        EXECUTE FUNCTION create_default_users_for_store();

                                        CREATE TRIGGER users_protect_default_users
                                        BEFORE UPDATE ON users
                                        FOR EACH ROW
                                        EXECUTE FUNCTION protect_default_users();

                                        CREATE TRIGGER sales_ensure_customer
                                        BEFORE INSERT OR UPDATE OF user_id, store_id ON sales
                                        FOR EACH ROW
                                        EXECUTE FUNCTION ensure_user_role('customer');

                                        CREATE TRIGGER orders_ensure_supplier
                                        BEFORE INSERT OR UPDATE OF user_id, store_id ON orders
                                        FOR EACH ROW
                                        EXECUTE FUNCTION ensure_user_role('supplier');

                                        CREATE TRIGGER staff_ensure_worker
                                        BEFORE INSERT OR UPDATE OF user_id, store_id ON staff
                                        FOR EACH ROW
                                        EXECUTE FUNCTION ensure_user_role('worker');

                                        CREATE TRIGGER sales_prevent_pending_default_user
                                        BEFORE INSERT OR UPDATE OF user_id, state, store_id ON sales
                                        FOR EACH ROW
                                        EXECUTE FUNCTION prevent_pending_for_default_users();

                                        CREATE TRIGGER orders_prevent_pending_default_user
                                        BEFORE INSERT OR UPDATE OF user_id, state, store_id ON orders
                                        FOR EACH ROW
                                        EXECUTE FUNCTION prevent_pending_for_default_users();

                                        CREATE TRIGGER staff_prevent_pending_default_user
                                        BEFORE INSERT OR UPDATE OF user_id, state, store_id ON staff
                                        FOR EACH ROW
                                        EXECUTE FUNCTION prevent_pending_for_default_users();

                                        CREATE TRIGGER sales_apply_stock
                                        AFTER INSERT OR UPDATE OF product_id, quantity, state, store_id ON sales
                                        FOR EACH ROW
                                        EXECUTE FUNCTION apply_sale_stock();

                                        CREATE TRIGGER orders_apply_stock
                                        AFTER INSERT OR UPDATE OF product_id, quantity, state, store_id ON orders
                                        FOR EACH ROW
                                        EXECUTE FUNCTION apply_order_stock();
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
