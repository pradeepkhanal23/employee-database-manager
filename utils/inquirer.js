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
      console.log("add an employee selected");
      break;
    case "Update an employee role":
      console.log("updated an employee role selected");
      break;
    case "Quit":
      process.exit(0);
      break;
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
