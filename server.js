const inquirer = require("inquirer");
const consoleTable = require ('console.table');
const fs = require("fs");
const db = require('./db/connection');
const mysql = require("mysql2");
const util = require("util");
const { response } = require("express");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Vegies19",
    database: "employees"
});



connection.connect((err) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    } 
    res.json({
        message: 'success',
        data: rows,
    })
    Search();

});

// inquirer search function
function search () {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What to do?",
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
    };