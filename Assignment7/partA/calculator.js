$(document).ready(() => {
    const validateNumber = (field, errorField) => {
        const value = $(field).val();
        if (!value || isNaN(value) || /[^0-9]/.test(value)) { //special characters
            $(errorField).show();
            return false;
        } else {
            $(errorField).hide();
            return true;
        }
    };

    $("input").on("input", () => {
        validateNumber("#input1", "#number1Error");
        validateNumber("#input2", "#number2Error");
    });

    const calculate = (operation) => {
        const num1 = parseFloat($("#input1").val());
        const num2 = parseFloat($("#input2").val());

        if (!validateNumber("#input1", "#number1Error") || !validateNumber("#input2", "#number2Error")) {
            $("#output").val("");
            return;
        }

        let result;
        switch (operation) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "divide":
                if (num2 === 0) {
                    $("#output").val("Cannot divide by zero.");
                    return;
                }
                result = num1 / num2;
                break;
        }

        // infinite result
        if (!isFinite(result)) {
            $("#output").val("Result is infinite.");
            return;
        }

        $("#output").val(result);
    };

    $("#add").click(() => calculate("add"));
    $("#subtract").click(() => calculate("subtract"));
    $("#multiply").click(() => calculate("multiply"));
    $("#divide").click(() => calculate("divide"));

    $("#reset").click(() => {
        $("#input1").val("");
        $("#input2").val("");
        $("#output").val("");
        $("#number1Error").hide();
        $("#number2Error").hide();
    });
});
