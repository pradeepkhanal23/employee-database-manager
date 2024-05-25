const inquirer = require("inquirer");
const runQuery = require("../db/query");

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
        await runQuery("select * from departments");
      } catch (error) {
        console.error("Error fetching the query", error);
      }
      cli();
      break;

    case "View all roles":
      try {
        await runQuery("select * from roles");
      } catch (error) {
        console.error("Error fetching the query", error);
      }
      cli();
      break;

    case "View all employees":
      try {
        await runQuery("select * from employees");
      } catch (error) {
        console.error("Error fetching the query", error);
      }
      cli();
      break;

    case "Add a department":
      const department = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter the department name:",
      });

      try {
        await runQuery("insert into departments (name) VALUES ($1)", [
          department.name,
        ]);
        console.log("Department added successfully");
      } catch (error) {
        console.error(error);
      }
      cli();
      break;

    case "Add a role":
      console.log("add a role selected");
      break;
    case "Add an employee":
      console.log("add an employee selected");
      break;
    case "Update an employee role":
      console.log("updated an employee role selected");
      break;
    case "Quit":
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
