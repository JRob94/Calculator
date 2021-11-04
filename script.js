

var input = document.getElementById(`input`), // input/output button
    number = document.querySelectorAll(`.numbers div`), // number buttons
    operator = document.querySelectorAll(`.operators div`), // operator buttons
    result = document.getElementById(`result`), // equal button
    clear = document.getElementById(`clear`), // clear button
    resultDisplayed = false; // flag to keep an eye on what output is displayed

    // Adding event listeners to numbers buttons
    for (var i = 0; i < number.length; i++) {
        number[i].addEventListener(`click`, (e) => {

            // storing current input string and its last character in variables for later use
            var currentString = input.innerHTML;
            var lastChar = currentString[currentString.length - 1];

            // if result is not displayed, keep adding
            if (resultDisplayed === false) {
                input.innerHTML += e.target.innerHTML;
            } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                // if result is currently displayed and user pressed an operator
                // keep adding to the string for next operation
                resultDisplayed = false;
                input.innerHTML += e.target.innerHTML;
            } else {
                // if result is currently displayed and user pressed a number
                // clear the input string and add the new input to start new operation
                resultDisplayed = false;
                input.innerHTML = ``;
                input.innerHTML += e.target.innerHTML;
            }
        });
    }

    // Adding event listeners to operator buttons
    for (var i = 0; i < operator.length; i++) {
        operator[i].addEventListener(`click`, (e) => {
            // Storing current input string last character in variables for later use
            var currentString = input.innerHTML;
            var lastChar = currentString[currentString.length -1];
            // If last character entered is an operator, replace it with the currently pressed one
            if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
                var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
                input.innerHTML = newString;
            } else if (currentString.length == 0) {
                // if first key pressed is an operator, don't do anything
                console.log(`Enter a number first`);
            } else {
                // else just add the operator pressed to the input
                input.innerHTML += e.target.innerHTML;
            }
        });
    }

    // On click of equal button
    result.addEventListener(`click`, () => {
        // this is the string that will be processing 
        var inputString = input.innerHTML;
        // Forming an array of numbers
        var numbers = inputString.split(/\+|\-|\×|\÷/g);
        // forming an array of operators
        var operators = inputString.replace(/[0-9]|\./g, "").split("");

        console.log(inputString);
        console.log(operators);
        console.log(numbers);
        console.log("----------------------------");

        // Now we are looping through the array and doing one operation at a time
        // first divide, then multiply, then subtraction and then addition
        // As we move we are altering the original numbers and operators array
        // The final element remaining in the array will be the output

        var divide = operators.indexOf("÷");
        while (divide != -1) {
            numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
            operators.splice(divide, 1);
            divide = operators.indexOf("÷");
        }

        var multiply = operators.indexOf("×");
        while (multiply != -1) {
          numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
          operators.splice(multiply, 1);
          multiply = operators.indexOf("×");
        }

        var subtract = operators.indexOf("-");
        while (subtract != -1) {
            numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
            operators.splice(subtract, 1);
            subtract = operators.indexOf("-");
          }

          var add = operators.indexOf("+");
          while (add != -1) {
            // using parseFloat is necessary, otherwise it will result in string concatenation
            numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
            operators.splice(add, 1);
            add = operators.indexOf("+");
          }
        
          input.innerHTML = numbers[0]; // displaying the output
        
          resultDisplayed = true; // turning flag if result is displayed
    });

    // Clearing the input when clear button is clicked
    clear.addEventListener(`click`, () => {
        input.innerHTML = ``;
    });