function checkInputValidity(input) {
  if (!input) {
    console.error("\nPlease enter the department name!");
    return false;
  } else if (!isNaN(input)) {
    console.error("\nPlease enter a string value!");
    return false;
  } else {
    return true;
  }
}

module.exports = checkInputValidity;
