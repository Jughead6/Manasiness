CREATE TABLE sales (
    id_product FOREIGN KEY REFERENCES products(id_product) NOT NULL,
    sale_price_product FOREIGN KEY REFERENCES products(sale_price_product) NOT,
    amount_sale INT NOT NULL,
    date_sale DATE NOT NULL
);