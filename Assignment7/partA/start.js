$(document).ready(() => {
    const validateForm = () => {
        let isValid = true;

        const emailPattern = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;

        const username = $("#usernames").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();

        // Validate Username
        if (!username || username.length < 3 || username.length > 15) {
            $("#usernameError").show();
            isValid = false;
        } else {
            $("#usernameError").hide();
        }

        // Validate Email
        if (!email) {
            $("#emailError").show();
            isValid = false;
        } else if (!emailPattern.test(email)) {
            $("#emailError").text("Email must be a Northeastern email.").show();
            isValid = false;
        } else {
            $("#emailError").hide();
        }

        // Validate Password
        if (!password || password.length < 6 || password.length > 20) {
            $("#passwordError").show();
            isValid = false;
        } else {
            $("#passwordError").hide();
        }

        // Confirm Password
        if (!confirmPassword || confirmPassword.length < 6 || confirmPassword.length > 20) {
            $("#confirmPasswordError").show();
            isValid = false;
        } else if (password !== confirmPassword) {
            $("#confirmPasswordError").text("Passwords do not match.").show();
            isValid = false;
        } else {
            $("#confirmPasswordError").hide();
        }

        // Enable/Disable Login Button
        $("#loginButton").prop("disabled", !isValid);
    };

    $("input").on("input", validateForm);

    $("#loginForm").on("submit", (e) => {
        e.preventDefault(); // Prevent form submission
        sessionStorage.setItem("user", $("#usernames").val()); // Store username
        window.location.href = "calculator.html"; // Redirect to calculator page
    });
});
