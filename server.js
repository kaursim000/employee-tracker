const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        port: 3306,
        // MySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);


const inquirer = require('inquirer');


function mainMenu() {
    
 inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choices',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        }
    ])
    .then((response) => {
        switch (response.choices) {
            case 'view all departments':
                db.query('SELECT * FROM department;', function (err, results) {
                    console.log(results);})
                break;
            case 'view all roles':
                db.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON department_id=department.id;', function (err, results) {
                    console.log(results);})
                break;
            case 'view all employees':
                db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id FROM employee JOIN role ON role_id=role.id JOIN department ON department_id=department.id;', function (err, results) {
                    console.log(results);})
                break;
            case 'add a department':
                inquirer
                    .prompt(
                        {
                        type:'input',
                        message: "What department would you like to add?",
                        name: 'department'
                        })
                db.query('INSERT INTO department (name) VALUE ', function (err, results) {
                    console.log(results);})
                break;
            case 'add a role':
                inquirer
                    .prompt(
                        {
                        type:'input',
                        message: "What role would you like to add?",
                        name: 'role'
                        })
                db.query('INSERT INTO role (title) VALUE ', function (err, results) {
                    console.log(results);})
                break;
            case 'add an employee':
                inquirer
                    .prompt(
                        {
                        type:'input',
                        message: "What employee would you like to add?",
                        name: 'employee'
                        })
                db.query('INSERT INTO employee (first_name) VALUE ', function (err, results) {
                    console.log(results);})
                break;

        }
    });
}


mainMenu();

module.exports