const inquirer = require("inquirer");

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

function cli() {
  inquirer.prompt(questions).then((answers) => {
    console.log(answers.choice);
  });
}

module.exports = cli;
