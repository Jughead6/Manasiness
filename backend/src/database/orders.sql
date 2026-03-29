CREATE TABLE orders (
    id_user FOREIGN KEY REFERENCES users(id_user) NOT NULL,
    id_product FOREIGN KEY REFERENCES products(id_product) NOT NULL,
    cost_price_product FOREIGN KEY REFERENCES products(cost_price_product) NOT NULL,
    date_order DATE NOT NULL,
    amount_order INT NOT NULL
);