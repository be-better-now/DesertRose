USE DESERT_ROSE;
GO

-- ========================
-- ROLES
-- ========================
CREATE TABLE roles (
                       id INT IDENTITY PRIMARY KEY,
                       name NVARCHAR(50) NOT NULL UNIQUE
);

-- ========================
-- USERS
-- ========================
CREATE TABLE users (
                       id INT IDENTITY PRIMARY KEY,
                       username NVARCHAR(100) NOT NULL UNIQUE,
                       email NVARCHAR(150) NOT NULL UNIQUE,
                       password NVARCHAR(255) NOT NULL,
                       role_id INT,
                       created_at DATETIME DEFAULT GETDATE(),

                       FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- ========================
-- CATEGORIES
-- ========================
CREATE TABLE categories (
                            id INT IDENTITY PRIMARY KEY,
                            name NVARCHAR(100) NOT NULL,
                            description NVARCHAR(255)
);

-- ========================
-- FLOWERS (PRODUCTS)
-- ========================
CREATE TABLE flowers (
                         id INT IDENTITY PRIMARY KEY,
                         name NVARCHAR(150) NOT NULL,
                         price DECIMAL(10,2) NOT NULL,
                         stock INT NOT NULL DEFAULT 0,
                         image_url NVARCHAR(255),
                         description NVARCHAR(MAX),
                         category_id INT,
                         created_at DATETIME DEFAULT GETDATE(),

                         FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ========================
-- CART
-- ========================
CREATE TABLE cart (
                      id INT IDENTITY PRIMARY KEY,
                      user_id INT UNIQUE,
                      created_at DATETIME DEFAULT GETDATE(),

                      FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ========================
-- CART ITEMS
-- ========================
CREATE TABLE cart_items (
                            id INT IDENTITY PRIMARY KEY,
                            cart_id INT,
                            flower_id INT,
                            quantity INT NOT NULL,

                            FOREIGN KEY (cart_id) REFERENCES cart(id),
                            FOREIGN KEY (flower_id) REFERENCES flowers(id)
);

-- ========================
-- ADDRESSES
-- ========================
CREATE TABLE addresses (
                           id INT IDENTITY PRIMARY KEY,
                           user_id INT,
                           full_name NVARCHAR(150),
                           phone NVARCHAR(20),
                           address_line NVARCHAR(255),
                           city NVARCHAR(100),
                           created_at DATETIME DEFAULT GETDATE(),

                           FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ========================
-- ORDERS
-- ========================
CREATE TABLE orders (
                        id INT IDENTITY PRIMARY KEY,
                        user_id INT,
                        address_id INT,
                        total_price DECIMAL(12,2),
                        status NVARCHAR(50) DEFAULT 'PENDING',
                        created_at DATETIME DEFAULT GETDATE(),

                        FOREIGN KEY (user_id) REFERENCES users(id),
                        FOREIGN KEY (address_id) REFERENCES addresses(id),

                        CHECK (status IN ('PENDING','CONFIRMED','SHIPPING','DELIVERED','CANCELLED'))
);

-- ========================
-- ORDER ITEMS (SNAPSHOT PRICE)
-- ========================
CREATE TABLE order_items (
                             id INT IDENTITY PRIMARY KEY,
                             order_id INT,
                             flower_id INT,
                             quantity INT,
                             price DECIMAL(10,2), -- snapshot giá tại thời điểm mua

                             FOREIGN KEY (order_id) REFERENCES orders(id),
                             FOREIGN KEY (flower_id) REFERENCES flowers(id)
);

-- ========================
-- PAYMENTS
-- ========================
CREATE TABLE payments (
                          id INT IDENTITY PRIMARY KEY,
                          order_id INT,
                          method NVARCHAR(50),
                          status NVARCHAR(50),
                          paid_at DATETIME,

                          FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ========================
-- REVIEWS
-- ========================
CREATE TABLE reviews (
                         id INT IDENTITY PRIMARY KEY,
                         user_id INT,
                         flower_id INT,
                         rating INT CHECK (rating BETWEEN 1 AND 5),
                         comment NVARCHAR(MAX),
                         created_at DATETIME DEFAULT GETDATE(),

                         FOREIGN KEY (user_id) REFERENCES users(id),
                         FOREIGN KEY (flower_id) REFERENCES flowers(id)
);