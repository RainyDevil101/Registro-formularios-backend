CREATE DATABASE database_art;

USE database_art;

CREATE TABLE users(
    id INT(11) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

