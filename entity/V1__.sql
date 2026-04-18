CREATE TABLE flowers
(
    flower_id   bigint IDENTITY (1, 1) NOT NULL,
    flower_name varchar(150) NOT NULL,
    price       float(53)    NOT NULL,
    stock       int          NOT NULL,
    image_url   varchar(255),
    description nvarchar(MAX),
    category_id bigint,
    created_at  datetime,
    CONSTRAINT pk_flowers PRIMARY KEY (flower_id)
)
    GO

ALTER TABLE flowers
    ADD CONSTRAINT uc_flowers_flower_name UNIQUE (flower_name)
    GO

ALTER TABLE flowers
    ADD CONSTRAINT FK_FLOWERS_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES categories (category_id)
    GO