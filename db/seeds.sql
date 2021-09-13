use employees;

INSERT INTO department
    (department_name)
VALUES
    ('Sales'),
    ('VDC'),
    ('IT'),
    ('Accounting');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 150000, 1),
    ('Salesperson', 100000, 1),
    ('Senior Detailer', 100000, 2),
    ('Detailing Manager', 120000, 2),
    ('IT Manager', 160000, 3),
    ('IT Engineer', 125000, 3),
    ('CFO', 250000, 4),
    ('Accountant', 90000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Randall', 'Flagg', 1, NULL),
    ('Eddie', 'Dean', 2, 1),
    ('Cuthbert', 'Allgood', 3, NULL),
    ('Roland', 'Deschain', 4, 3),
    ('Alain', 'Johns', 5, NULL),
    ('Susannah', 'Dean', 6, 5),
    ('Mordred', 'Deschain', 7, NULL),
    ('Jake', 'Chambers', 8, 7);