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
