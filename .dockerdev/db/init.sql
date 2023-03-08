CREATE DATABASE discord_dev;
CREATE DATABASE discord_test;

CREATE USER 'db_user'@'localhost' IDENTIFIED BY 'db_password';
ALTER USER 'db_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'db_user';
RENAME USER 'db_user'@'localhost' TO 'db_user'@'%';
GRANT ALL PRIVILEGES ON discord_dev.* TO 'db_user'@'%';
GRANT ALL PRIVILEGES ON discord_test.* TO 'db_user'@'%';
