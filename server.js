// work on this file was completed with assistance from a classmate, Tyler Bedard
const inquirer = require("inquirer");
const mysql = require("mysql2");
// const connection = require('./connection/connection.js')

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_db",
});

const initPrompt =  () => {
  const result = inquirer.prompt([
    {
      name: "initialInquiry",
      type: "list",
      message: "Welcome to the employee database! Please choose an action.",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee's role",
        "Exit program",
      ],
    },
  ])
    .then((response) => {
      switch (response.initialInquiry) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all departments":
          viewAllDepartments();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee's role":
          updateEmployeeRole();
          break;
        case "Exit program":
          connection.end();
          console.log(
            "\n You have exited the employee management program. Thanks for using! \n"
          );
          return;
        default:
          break;
      }
    })
    .catch((e) => console.log("e", e));
};

const viewAllDepartments = () => {
  connection.query(`SELECT * FROM department;`, (err, res) => {
    if (err) throw err;
    console.log("\n")
    console.table(res);
  });
  initPrompt();
};

const viewAllRoles = () => {
  connection.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    console.log("\n")
    console.table(res);
  });
  initPrompt();
};

const viewAllEmployees = () => {
  connection.query(`SELECT * FROM employee;`, (err, res) => {
    if (err) throw err;
    console.log("\n")
    console.table(res);
  });
  initPrompt();
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDept",
        type: "input",
        message: "What deparment would you like to add?",
      },
    ])
    .then((response) => {
      connection.query(
        `INSERT INTO department SET ?`,
        {
          name: response.newDept,
        },
        (err, response) => {
          if (err) throw err;
          console.log(`department successfully added to database!`);
          initPrompt();
        }
      );
    });
};

const addRole = () => {
  connection.query(`SELECT * FROM department;`, (err, res) => {
    if (err) throw err;
    let departments = res.map((department) => ({
      name: department.name,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What role would you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What the salary for this role?",
        },
        {
          name: "departmentName",
          type: "list",
          message: "What department does this role belong too?",
          choices: departments,
        },
      ])
      .then((response) => {
        connection.query(
          `INSERT INTO role SET ?`,
          {
            title: response.title,
            salary: response.salary,
            department_id: response.departmentName,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${response.title} added to database!`);
            initPrompt();
          }
        );
      });
  });
};

const addEmployee = () => {
  connection.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({ name: role.title, value: role.id }));
    connection.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + "" + employee.last_name,
        value: employee.id,
      }));

      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employees first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employees last name?",
          },
          {
            name: "role",
            type: "list",
            message: "What is this employees role?",
            choices: roles,
          },
          {
            name: "manager",
            type: "list",
            message: "Who is this employees manager?",
            choices: employees,
          },
        ])
        .then((response) => {
          connection.query(`INSERT INTO employee SET ?`, {
            first_name: response.firstName,
            last_name: response.lastName,
            role_id: response.role,
            manager_id: response.manager,
          }),
            (err, res) => {
              if (err) throw err;
            };
          console.log(`employee added to the database!`);
          initPrompt();
        });
    });
  });
};

const updateEmployeeRole = () => {
  connection.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    let role = res.map((role) => ({ name: role.title, value: role.role_id }));
    connection.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employee = res.map((employee) => ({
        name: employee.first_name + "" + employee.last_name,
        value: employee.employee_id,
      }));
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "What employee will have their role updated?",
            choices: employee,
          },
          {
            name: "newRole",
            type: "list",
            message: "What will the new employees role be?",
            choices: role,
          },
        ])
        .then((response) => {
          connection.query(
            `UPDATE employee SET ? WHERE ?`,
            [
              {
                id: response.newRole,
              },
              {
                id: response.employee,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(`Successfully updated role!`);
              initPrompt();
            }
          );
        });
    });
  });
};

initPrompt();
