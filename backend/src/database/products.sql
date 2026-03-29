CREATE TABLE products (
    id_product PRIMARY KEY AUTO_INCREMENT,
    pname_product VARCHAR(100) NOT NULL UNIQUE,
    description_product VARCHAR(100) NOT NULL,
    image_product VARCHAR(100) NOT NULL UNIQUE,
    category_product VARCHAR(100) NOT NULL,
    cost_price_product INT NOT NULL,
    sale_price_product INT NOT NULL,
    stock_product INT NOT NULL
);