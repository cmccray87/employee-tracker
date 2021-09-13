const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const cTable = require('console.table');
const util = require("util");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Vegies19",
    database: "employees"
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        res.status(500);
        return res.send("error connecting to database");
    } console.log("Connected");

    // Function for inquirer to prompt data
    search();

})
// inquirer search function
function search () {
    inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Employees by Department",
                "View all Employees by Manager",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager"
            ]
        })
        .then(answers => {
            switch (answers.action) {
                // view employees
                case "View all Employees":
                    sortEmployees();
                    search();

                    break;

                // view all employees by department
                case "View all Employees by Department":
                    sortDepartment();
                    search();

                    break;
                
                // view all employees by manager
                case "View all Employees by Mmanager":

                    sortManager();
                    search();

                    break;

                // add employee + input
                case "Add employee":
                    inquirer.prompt([
                        {
                            name: "employeeFirst",
                            type: "input",
                            message: "What is employee's first name?",
                            validate: answer => {
                                if (answer !== "") {
                                    return true;
                                }
                                return "Enter atleast one character.";
                            }
                        },
                        {
                            name: "manager",
                            type: "input",
                            message: "Enter manager ID",
                        }
                    ])
                    .then(answers => {
                        addEmployee(answers.employeeFirst, answers.employeeLast, answers.department, answers.manager);
                        search();

                    })

                    break;

                // add department + input
                case "Add Department":
                    inquirer
                        .prompt([
                            {
                                name: "Department",
                                type: "input",
                                message: "What is the department you want to add?",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Enter atleast one character.";
                                }
                            },
                        ])
                        .then(answers => {
                            addDepartment(answers.Department);
                            search();
                        })

                    break;  
                
                // add role + input
                case "Add Role":
                    inquirer
                        .prompt([
                            {
                                name: "Title",
                                type: "input",
                                message: "Please enter the role's title.",
                                validate: answer => {
                                    if (answer !== "") {
                                        return true;
                                    }
                                    return "Enter at least one character.";
                                }
                            },
                            {
                                name: "salary",
                                type: "input",
                                message: "Please enter the role's salary.",

                            },
                            {
                                name: "department_id",
                                type: "input",
                                message: "Please enter the department id.",

                            }

                        ])
                        .then(answers => {
                            addRole(answers.title, answers.salary, answers.department_id);
                            Search();
                        })
                    break;

                // remove employee + input
                case "Remove employee":
                    inquirer
                        .prompt([
                            {
                                name: "id",
                                type: "input",
                                message: "Please enter the Employee id",

                            }
                        ]).then(answers => {
                            removeEmployee(answers.id);
                            search();
                        })
                    break;

                // update employee + input
                case "Update employee role":
                    inquirer
                        .prompt([
                            {
                                name: "employeeId",
                                type: "input",
                                message: "Please enter employee's id",
                            },
                            {
                                name: "roleId",
                                type: "input",
                                message: "Please enter role's id",

                            }

                        ])
                        .then(answers => {
                            updateSortRole(answers.employeeId, answers.roleId);
                            search();

                        })

                    break;

                // update employee manager + input
                case "Update employee manager":

                    inquirer
                        .prompt([
                            {
                                name: "manager",
                                type: "input",
                                message: "Please enter manager id",
                            },
                            {
                                name: "Employee",
                                type: "input",
                                message: "Please enter employee id",

                            }
                        ])
                        .then(answers => {
                            updateSortManager(answers.manager, answers.Employee);
                            search();

                        })

                    break;
                    
            }
        })
    };

function sortEmployees() {
    var results = connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.d_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
        

    function (error, results) {
        if (error) throw error
        console.table(results)
    })
    console.log(error);
};

function sortDepartment() {

var department = connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, department.d_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id;",


    function (error, department) {
        if (error) throw error
        console.table(department)
    })
};

function sortManager() {

var manager = connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.d_name, employee.manager_id AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id;",


    function (error, manager) {
        if (error) throw error
        console.table(manager)
    })
};


function updateSortManager(managerId, employeeId) {

var updateManager = connection.query(
    "UPDATE employee SET manager_id = ? WHERE id = ?",
    [managerId, employeeId],
    function (error, updateManager) {
        if (error) throw error
    })

sortManager();

}

function addEmployee(employeeFirst, employeeLast, department, manager) {

var add = connection.query(
    "INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?",
    [employeeFirst, employeeLast, department, manager],
    function (error, add) {
        if (error) throw error
    })

sortEmployees();
}

function departmentTable() {
var depTable = connection.query("SELECT d_name FROM department;",


    function (error, depTable) {
        if (error) throw error
        console.table(depTable)
    })
}

function addDepartment(department) {

var department = connection.query(
    "INSERT INTO department SET d_name = ?",
    [department],
    function (error, department) {
        if (error) throw error
    })

departmentTable();
}

function roleTable() {
var rTable = connection.query("SELECT title, salary, department_id FROM role;",

    function (error, rTable) {
        if (error) throw error
        console.table(rTable)
    })
}

function addRole(title, salary, department_id) {

var newRole = connection.query(
    "INSERT INTO role SET title = ?, salary = ?, department_id = ?",
    [title, salary, department_id],
    function (error, newRole) {
        if (error) throw error
    })

roleTable();
}

function removeEmployee(id) {

var add = connection.query(
    "DELETE FROM employee WHERE id = ?",
    [id],
    function (error, id) {
        if (error) throw error
    })

sortEmployees();
}

function updateSortRole(employeeId, roleId) {

var sortRole = connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",

    [roleId, employeeId],
    function (error, role) {
        if (error) throw error

    })
sortDepartment();
}