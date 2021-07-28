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
                db.query('SELECT * FROM department;')
                break;
            case 'view all roles':
                db.query('SELECT title FROM role;')
                break;
            case 'view all employees':
                db.query('SELECT first_name last_name FROM employee;')
                break;
            // case 'add a department':

        }
    });
}


mainMenu();

module.exports