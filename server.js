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
                        console.log(results);
                        console.table(results);
                    })
                    break;


                case 'view all roles':
                    db.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON department_id=department.id;', function (err, results) {
                        console.log(results);
                        console.table(results);
                    })
                    break;


                case 'view all employees':
                    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id FROM employee JOIN role ON role_id=role.id JOIN department ON department_id=department.id;', function (err, results) {
                        console.log(results);
                        console.table(results);
                    })
                    break;


                case 'add a department':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: "What department would you like to add?",
                                name: 'department'
                            }]).then(answers => {
                                db.query('INSERT INTO department (name) VALUE(?)', [answers.department], (err, results) => {
                                    if (err) {
                                        console.log(err)
                                        db.end();

                                    } else
                                        console.log('Added!')
                                    console.log('here -------->',answers, '----------');
                                    
                                    db.query('SELECT * FROM department;', function (err, results) {
                                        console.log(results);
                                        console.table(results);
                                    })
                                })
                            })
                    break;


                case 'add a role':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: "What role would you like to add?",
                                name: 'role'
                            },
                            {
                                type: 'input',
                                message: "What is the salary?",
                                name: 'salary'
                            },
                            {
                                type: 'input',
                                message: "What is the department id?",
                                name: 'departmentId'
                            }]).then(answers => {
                                db.query('INSERT INTO role (title, salary, department_id) VALUE(?, ?, ?)', [answers.role, answers.salary, answers.departmentId], (err, results) => {
                                    if (err) {
                                        console.log(err)
                                        db.end();

                                    } else
                                        console.log('Added!')
                                    console.log(answers);
                                    db.query('SELECT * FROM role;', function (err, results) {
                                        console.log(results);
                                        console.table(results);
                                    })
                                })
                            })
                    break;

                    
                case 'add an employee':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: "What is the employee's first name?",
                                name: 'firstName'
                            },
                            {
                                type: 'input',
                                message: "What is the employee's last name?",
                                name: 'lastName'
                            },
                            {
                                type: 'input',
                                message: "What is the employee's role ID?",
                                name: 'roleId'
                            },
                            {
                                type: 'input',
                                message: "What is the employee's manager's ID?",
                                name: 'manager'
                            }
                        ]).then(answers => {
                            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE(?,?,?,?)', [answers.firstName, answers.lastName, answers.roleId, answers.manager], (err, results) => {
                                if (err) {
                                    console.log(err)
                                    db.end();

                                } else
                                    console.log('Added!')
                                console.log(answers);
                                db.query('SELECT * FROM employee;', function (err, results) {
                                    console.log(results);
                                    console.table(results);
                                })
                            })
                        })
                    break;


                case 'update an employee role':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: "What would you like to update the role to?",
                                name: 'roleupdate'
                            },
                            {
                                type: 'input',
                                message: "What is the employee id",
                                name: 'id'
                        }]).then(answers => {
                    db.query('UPDATE employee SET role_id=(?) WHERE id=(?)',[answers.roleupdate, answers.id], function (err, results) {
                        if (err) {
                            console.log(err)
                            db.end();

                        } else
                            console.log('Updated!')
                        console.log(answers);
                        db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id FROM employee JOIN role ON role_id=role.id JOIN department ON department_id=department.id;', function (err, results) {
                            console.log(results);
                            console.table(results);
                        })
                    })
                })
                    break;

            }
        });
}


mainMenu();

module.exports