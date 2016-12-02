window.onload = function() {
    //the index page was loaded
    //we can make the coursor focus in the input
    document.getElementById("userInput").focus();
};

/**
 * validateIBAN - this function is triggered on 'Validate' button click
 */
function validateIBAN() {
    var userInput = document.getElementById("userInput").value;

    //IBAN.setIBAN(userInput);
    IBAN.validateIBAN(userInput);

    document.getElementById("validationFeedback").innerHTML = IBAN.getStatus();
}