const inquirer = require('inquirer');
// const Database = require('./db/connection')
const cTable = require('console.table');
const { query } = require('express');
const connection = require('./db/connection');


// view all employees
async function viewAllEmployees() {
    const query = `SELECT* FROM employees`;
    const rows = await connection.query(query);
    console.table(rows)
};

// add new role
async function addRole(roleInformation) {
    const departmentId = await obtainDepartmentId(roleInformation.departmentName);
    const salary = roleInformation.salary;
    const role = roleInformation.roleName;
    const query = `INSERT INTO roles (role, salary, department_id) VALUES (?,?,?)`;
    const args = [role, salary, departmentId];
    await connection.query(query, args);
    console.log('New role successfully added')
};

// update employee role 
async function updateEmployeeRole(info) {
    console.log(info)
    const roleId = await obtainRoleId(info.role);
    const employee = employeeRoster(info.employee);
    const query = `UPDATE employees SET role_id = ? WHERE employee.first_name = ? AND employee.last_name = ?`;
    const args = [roleId, employee[0], employee[1]];
    await connection.query(query, args);
    console.log('updated ${employee[0] ${employee[1] with a new role: ${info.role}');
}

//add department
async function acquireDepartmentInfo(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    const query = `INSERT into departments (name) VALUES (?)`;
    const args = [departmentName];
    const rows = await connection.query(query, args);
    console.log('${departmentName} added as new department.')
}

// view all employees 
async function acquireEmployeeRoster() {
    const query = `SELECT * FROM employees`;
    const rows = await connection.query(query);
    let names = [];
    for (const employee of rows) {
        names.push('${employee.first_name} ${employee.last_name}');
    }
    return names;
};

// view all departments
async function obtainAllDepartments() {
    const query = `SELECT id AS 'ID', name AS 'Department' FROM departments`;
    const rows = await connection.query(query);
    console.table(rows);
}

// get roles 
async function obtainRoles() {
    const query = `SELECT title FROM role`;
    const rows = await connection.query(query);
    let roles = [];
    console.log(roles)
    console.log(rows)
    for (const row of rows) {
        roles.push(row.role)
    }
    return roles;
};

// view all roles
async function obtainAllRoles() {
    const query = `SELECT id AS 'ID', title AS 'Title', salary AS 'SALARY' FROM roles`;
    const rows = await connection.query(query);
    console.table(rows);
};

// get manager names
async function obtainManagerNames () {
    const query = `SELECT * FROM employees WHERE manager_id IS NULL`;
    const rows = await connection.query(query);
    console.log(employee)
    console.log(employeeNames)
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push('${employee.first_name} ${employee.last_name}')
    }
    return employeeNames;
};

// view details for all employees 
async function viewAllEmployeeDetails() {
    console.log('\n')
    const query = `SELECT employees.id AS 'ID',
    first_name AS 'First Name',
    last_name AS 'Last Name'
    role.role AS 'Title',
    department.name AS 'Department',
    role.salary AS 'Salary',
    manager_id AS 'Manager ID'
    FROM emplooyees, roles, departments
    WHERE employees.role_id = roles.id
    AND roles.department_id = department.id
    ORDER BY employees.id ASC
    `;
    const rows = await connection.query(query);
    console.table(rows)
};

// view all employees by dept
async function obtainEmployeesByDepartment() {
    console.log("\n")
    const query = `SELECT first_name AS 'First Name', last_name AS 'Last Name', department.name AS 'Department Name' FROM 
    ((employee INNER JOIN role ON role_id = roles.id)
    INNER JOIN department ON department_id = departments.id)
    ORDER BY employees.id ASC`;
    const rows = await connection.query(query);
    console.table(rows);
}

// get role ID
async function obtainRoleId(roleName) {
    const query = `SELECT id FROM roles WHERE roles.role = ?`
    const args = [roleName];
    const rows = await connection.query(query, args)
    return rows[0].id
};

// get department names
async function obtainDepartmentNames() {
    const query = `SELECT name FROM department`;
    const rows = await connection.query(query);
    let departments = [];
    console.log(rows)
    for (const row of rows) {
        departments.push(row.name)
    }
    return departments;
}

// get employee ID
async function obtainEmployeeId(employeeName) {
    if (employeeName === "None") {
        return null;
    }
    const firstName = employeeName.split('')[0];
    const lastName = employeeName.split('')[1];
    const query = `SELECT id FROM employees WHERE first_name = ? AND last_name = ?`;
    const rows = await connection.query(query, [firstName, lastName], (error, results) => {
        if (error) {
            console.log(error)
            throw error
        } else {
            return rows[0].id;
        }
    })
};

// get department by ID
async function obtainDepartmentId(departmentName) {
    const query = `SELECT * FROM departments WHERE departments.name = ?`;
    const args = [departmentName];
    const rows = await
        connection.query(query, args);
    return rows[0].id;
}

// retreive employee roster 
const employeeRoster = (name) => {
    console.log(name)
    let staff = name.split('');
    return staff;
}

// add an employee
async function insertEmployee(employee) {
    const roleId = await obtainRoleId(employees.role);
    const managerId = await obtainEmployeeId(employee.manager);
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?,?,?,?)`;
    const args = [employees.first_name, employees.last_name, roleId, managerId];
    const rows = await connection.query(query, args, (error) => {
        if (error) {
            console.log(error)
            throw error;
        } else {
            console.log('${employees.first_name} ${employees.last_name} added');
            return rows;
        }
    });
};

// remove an employee 
async function slashHire(employeeName) {
    console.log(employeeName)
    const firstName = employeeName.employee.split('')[0];
    const lastName = employeeName.employee.split('')[1];
    console.log(employeeName)
    query = `DELETE FROM employees WHERE first_name = ? AND last_name = ?`;
    await connection.query(query, [firstName, lastName]);
    console.log('${firsName} ${lastName} successfully removed');
};


// this function is the list that the user will interact with; uiPrompt
async function uiPrompt() {
    console.log('\n')
    return inquirer.prompt({
        name: "whatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments.",
            "View all roles.",
            "View all employees.",
            "View all employees by department.",
            "Add a department.",
            "Add a role.",
            "Add employee.",
            "Remove employee.",
            "Update employee role.",
            "End session."
        ]
    })
    .then()
    ;
};

// // add  new employee infor to db
// async function addEmployee() {
//     const managers = await obtainManagerNames();
//     const roles = await obtainRoles();
//     return inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "first_name",
//                 message: "Enter first name of employee:",
//             },
            
//             {
//                 type: "input",
//                 name: "last_name",
//                 message: "Enter last name of employee:",
//             },
//             {
//                 type: "list",
//                 name: "Assign employee role:",
//                 choices: [
//                     ...roles
//                 ],
//             },
//             {
//                 type: "list",
//                 name: "Assign manger (if applicable)",
//                 choices: [
//                     ...managers, "null"
//                 ],
//             },

//         ])
// }





// asynchronous to increase app performance & responsiveness

async function primary() {
    let terminateCurcuit = false
    while (!terminateCurcuit) {
        const prompt = await uiPrompt();
        switch(prompt.action.toLowerCase()) {
            // done
            case "view all employees": {
                await viewAllEmployees();
                break;
            }
            // done
            case "view all employees by department": {
                await obtainEmployeesByDepartment();
                break;
            }
            // done
            case "view all details for employees": {
                await viewAllEmployeeDetails();
                break;
            }
            // done
            case "view all departments": {
                await obtainAllDepartments();
                break;
            }
            // done
            case "view all roles": {
                await obtainAllRoles();
                break;
            }
            // done
            case "add employee": {
                const  newHire = await addEmployee();
                console.log(newHire);
                await insertEmployee(newHire);
                break;
            }
            case "remove employee": {
                const eject = await acquireSlashHireInfo();
                await slashHire(eject);
                break;
            }
            case "exit": {
                terminateCurcuit = true;
                console.log("Thank you for using employee tracker");
                process.exit(0);
            }

        }
    }
}
primary();