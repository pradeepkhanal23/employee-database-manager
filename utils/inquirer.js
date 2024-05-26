const inquirer = require("inquirer");
const runQuery = require("../db/query");
const {
  checkInputValidityString,
  checkInputValidityNumber,
} = require("../utils/checkInputValidity");

const questions = [
  {
    type: "list",
    message: "What would you like to do",
    name: "choice",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Quit",
    ],
  },
];

async function selectQuery(query) {
  switch (query) {
    case "View all departments":
      try {
        const departments = await runQuery("select * from departments");
        console.table(departments);
      } catch (error) {
        console.error("Error fetching the query", error);
      }
      cli();
      break;

    case "View all roles":
      try {
        const roles = await runQuery("select * from roles");
        console.table(roles);
      } catch (error) {
        console.error("Error fetching the query", error);
      }
      cli();
      break;

    case "View all employees":
      try {
        const employees = await runQuery("select * from employees");
        console.table(employees);
      } catch (error) {
        console.error("Error fetching the query", error);
      }
      cli();
      break;

    case "Add a department":
      const { department } = await inquirer.prompt({
        type: "input",
        name: "department",
        message: "Enter the department name:",
        validate: checkInputValidityString,
      });

      try {
        await runQuery("insert into departments (name) VALUES ($1)", [
          department,
        ]);
        console.log(`${department} added to the database`);
      } catch (error) {
        console.error(error);
      }
      cli();
      break;

    case "Add a role":
      const departments = await runQuery("select * from departments");

      const departmentsArray = departments.map((dept) => {
        return dept.name;
      });

      const roleQuestions = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
          validate: checkInputValidityString,
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for that role?",
          validate: checkInputValidityNumber,
        },
        {
          type: "list",
          name: "department_name",
          message: "Which Department does the role belong to?",
          validate: checkInputValidityString,
          choices: departmentsArray,
        },
      ]);

      const selectedDepartment = departments.find((dept) => {
        return dept.name === roleQuestions.department_name;
      });

      try {
        await runQuery(
          "insert into roles (title,salary,department_id) VALUES ($1,$2,$3)",
          [roleQuestions.title, roleQuestions.salary, selectedDepartment.id]
        );
        console.log(`${roleQuestions.title} role added to the roles database`);
      } catch (error) {
        console.error("Error adding the role", error);
      }
      cli();
      break;

    case "Add an employee":
      const roles = await runQuery("select * from roles");

      const rolesArray = roles.map((role) => {
        return role.title;
      });

      const employees = await runQuery("select * from employees");

      const managersArray = employees.map((employee) => {
        return `${employee.first_name} ${employee.last_name}`;
      });

      const employeeQuestion = await inquirer.prompt([
        {
          type: "input",
          name: "firstname",
          message: "What is the employee's first name?",
          validate: checkInputValidityString,
        },
        {
          type: "input",
          name: "lastname",
          message: "What is the employee's last name?",
          validate: checkInputValidityString,
        },
        {
          type: "list",
          name: "employee_role",
          message: "What is the employee's role?",
          choices: rolesArray,
          validate: checkInputValidityString,
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the employee's manager?",
          choices: [...managersArray, "None"],
          validate: checkInputValidityString,
        },
      ]);

      const selectedRole = roles.find((role) => {
        return role.title === employeeQuestion.employee_role;
      });

      const selectedManager = employees.find((employee) => {
        return (
          `${employee.first_name} ${employee.last_name}` ===
          employeeQuestion.manager
        );
      });

      try {
        await runQuery(
          "insert into employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
          [
            employeeQuestion.firstname,
            employeeQuestion.lastname,
            selectedRole.id,
            selectedManager?.id || null,
          ]
        );
        console.log(
          `${employeeQuestion.firstname} ${employeeQuestion.lastname} added to the employees database`
        );
      } catch (error) {
        console.error("Error adding the employee", error);
      }
      cli();
      break;

    case "Update an employee role":
      console.log("updated an employee role selected");
      break;
    case "Quit":
      process.exit(0);
    default:
      console.log("invalid choice");
      break;
  }
}

function cli() {
  inquirer.prompt(questions).then((answers) => {
    selectQuery(answers.choice);
  });
}

module.exports = cli;
