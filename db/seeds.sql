    -- Insert data into departments table
    INSERT INTO departments (name) VALUES
    ('HR'),
    ('Engineering'),
    ('Sales');

    -- Insert data into roles table
    INSERT INTO roles (title, salary, department_id) VALUES
    ('HR Manager', 160000, 1),
    ('Software Engineer', 80000, 2),
    ('Sales Representative', 50000, 3),
    ('Product Manager', 90000, 2);

    -- Insert data into employees table
    INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Frank', 'Fuuu', 1, NULL),  -- HR Manager
    ('Sean', 'Butcher', 2, 1),   -- Software Engineer, managed by Frank
    ('Pradeep', 'Khanal', 2, 2),  -- Software Engineer, managed by Sean
    ('Jeremy', 'White', 3, NULL),  -- Sales Representative
    ('Evrett', 'Godfrey', 4, 2),   -- Product Manager, managed by Sean
    ('James', 'Cameron-Taylor', 2, 2);   -- Software Engineer, managed by Sean

    
