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
