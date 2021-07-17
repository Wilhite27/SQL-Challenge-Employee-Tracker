INSERT INTO departments (name) VALUES ("HR");
INSERT INTO departments (name) VALUES ("Engineering");
INSERT INTO departments (name) VALUES ("Management");
INSERT INTO departments (name) VALUES ("Custodial Management");


INSERT INTO roles (title, salary, department_id) VALUES ("Human Resource Associate","55000","1");
INSERT INTO roles (title, salary, department_id) VALUES ("Data Analyst","145000","2");
INSERT INTO roles (title, salary, department_id) VALUES ("Mangement Director","55000","3");
INSERT INTO roles (title, salary, department_id) VALUES ("Custodial Specialist","45000","4");

INSERT INTO employees (first_name, last_name, role_id, manager_id, manager_name) VALUES ("Homer", "Simpson", 2/* , "Larry","Burns"*/);
INSERT INTO employees (first_name, last_name, role_id, manager_id, manager_name) VALUES ("Marge", "Simpson", 1/*, "Freddy","Pickles"*/);
INSERT INTO employees (first_name, last_name, role_id, manager_id, manager_name) VALUES ("Bart", "Simpson", 4/*,"Tabitha","Doubtfire"*/);
INSERT INTO employees (first_name, last_name, role_id, manager_id, manager_name) VALUES ("Lisa", "Simpson", 3/*, "Joanna", "Krabappel"*/);


