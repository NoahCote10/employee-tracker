INSERT INTO department(id, name)
VALUES  
        (1, 'QA'),
        (3, 'Supply Chain'),
        (2, 'QC'),
        (4, 'Customer Service'),
        (5, 'Packaging'),
        (6, 'Marketing'),
        (7, 'Accounting');


INSERT INTO role(id, title, salary, department_id)
VALUES  (1, 'Manager', 200000, 1),
        (2, 'Assitant Manager', 100000, 1),
        (3, 'Senior Dev', 100000, 1),
        (4, 'Jr Dev', 60000, 1),
        (5, 'Sales Lead', 85000, 4),
        (6, 'Sales Rep', 60000, 4),
        (7, 'QA Associate', 75000, 1);        


INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES  (10, 'Elend', 'Venture', 1, 1),
        (2, 'Kaladin', 'Stormblessed', 2, 2),
        (3, 'Tom', 'Delonge', 7, 3),
        (4, 'David', 'Bowie', 4, 3);
