CREATE DATABASE AUTHE_AUTHO;
--set extenstion
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL

);


INSERT INTO user (user_name,user_email,user_password)
VALUES ('manju','bmanjunath728@gmail.com','Fire728');
