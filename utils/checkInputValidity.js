function checkInputValidityString(input) {
  if (!input) {
    console.error("\nPlease enter value to proceed");
    return false;
  } else if (!isNaN(input)) {
    console.error("\nPlease enter a string value!");
    return false;
  } else {
    return true;
  }
}

function checkInputValidityNumber(input) {
  if (!input) {
    console.error("\nPlease enter value to proceed");
    return false;
  }
  if (!isNaN(input)) {
    return true;
  }
}

module.exports = {
  checkInputValidityString,
  checkInputValidityNumber,
};
