DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;


CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    PRIMARY KEY (id),
    description TEXT
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES roles(id)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP 
);
