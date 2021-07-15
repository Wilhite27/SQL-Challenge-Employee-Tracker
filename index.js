const express = require('express');
const router = express.Router();

router.use(require('./employeeRoutes'));
router.use(require('./departmentRoutes'));
router.use(require('./roleRoutes'));


module.exports = router;


function runSearch() {
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
        })
}