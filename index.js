const inquirer = require('inquirer');
const Database = require('./db/connection')
const cTable = require('console.table');

// connecting to database
const connection = new Database({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "root",
    database: "tracker_db",
});

// view all employees
async function viewAllEmployees () {
    const query = `SELECT* FROM employees`;
    const rows = await connection.query(query);
    console.table(rows)
};

// add new role
async function addRole (roleInformation) {
    const departmentId = await obtainDepartmentId(roleInformation.departmentName);
    const salary = roleInformation.salary;
    const role = roleInformation.roleName;
    const query = `INSERT INTO roles (role, salary, department_id) VALUES (?,?,?)`;
    const args =[role, salary, departmentId];
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


inquirer
.prompt({
    name: "whatToDo",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View all departments.",
        "View all roles.",
        "View all employees.",
        "Add a department.",
        "Add a role.",
        "Add employee.",
        "Update employee role.",
        "End session."
    ]
});

// asynchronous to increase app performance & responsiveness

async function primary() {
    let terminateCurcuit = false
    while(!terminateCurcuit) {
        const prompt = await uiPrompt();
        switch(prompt.action.toLowerCase()) {
            
        }
    }
}