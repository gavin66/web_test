-- 创建用户，数据库，赋予权限
-- create user web_user with password '123456';
-- create database web_test owner web_test;
-- grant all privileges on database web_test to web_user;
-- alter table products_es owner to web_user;

-- 必须 superuser 创建扩展
create extension multicorn;

CREATE SERVER multicorn_es FOREIGN DATA WRAPPER multicorn
OPTIONS (
  wrapper 'dite.ElasticsearchFDW'
);

CREATE TABLE products (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    price numeric(10,2),
    description text
);

CREATE FOREIGN TABLE products_es (
    id bigint,
    name text,
    price numeric(10,2),
    description text
) SERVER multicorn_es OPTIONS (host '127.0.0.1', port '9200', node 'products', index 'product');

CREATE OR REPLACE FUNCTION index_product() RETURNS trigger AS $def$
    BEGIN
        INSERT INTO products_es (id, name, price, description) VALUES
            (NEW.id, NEW.name, NEW.price, NEW.description);
        RETURN NEW;
    END;
$def$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION reindex_product() RETURNS trigger AS $def$
    BEGIN
        UPDATE products_es SET
            name = NEW.name,
            price = NEW.price,
            description = NEW.description
        WHERE id = NEW.id;
        RETURN NEW;
    END;
$def$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_product() RETURNS trigger AS $def$
    BEGIN
        DELETE FROM products_es a WHERE a.id = OLD.id;
        RETURN OLD;
    END;
$def$ LANGUAGE plpgsql;

CREATE TRIGGER es_insert_product
    AFTER INSERT ON products
    FOR EACH ROW EXECUTE PROCEDURE index_product();

CREATE TRIGGER es_update_product
    AFTER UPDATE OF name, price, description ON products
    FOR EACH ROW
    WHEN (OLD.id IS DISTINCT FROM NEW.id)
    EXECUTE PROCEDURE reindex_product();

CREATE TRIGGER es_delete_product
    BEFORE DELETE ON products
    FOR EACH ROW EXECUTE PROCEDURE delete_product();
