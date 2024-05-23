const figlet = require("figlet");

function showFiglet() {
  console.log(
    figlet.textSync("Employee Manager", {
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 180,
      whitespaceBreak: true,
    })
  );
}

module.exports = showFiglet;
