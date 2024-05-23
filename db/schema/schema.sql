-- Departments table
CREATE TABLE IF NOT EXISTS departments(
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- roles table
CREATE TABLE IF NOT EXISTS roles(
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    -- Foreign key section
    FOREIGN KEY(department_id)
    REFRENCES departments(id)
    ON DELETE SET NULL);

-- emplopyee table
CREATE TABLE IF NOT EXISTS employees(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) UNIQUE NOT NULL,
    last_name VARCHAR(30) UNIQUE NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER
    -- Foreign key section
    FOREIGN KEY(role_id) REFRENCES roles(id) ON DELETE SET NULL
    FOREIGN KEY(manager_id) REFRENCES employees(id) ON DELETE SET NULL
);