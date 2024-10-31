emailPattern regex, email validation: Checks for Northeastern email format using regex.
username: Validates length (3–15 characters).
password and confirmPassword: Ensures length (6–20 characters) and password match.
$("#loginButton").prop("disabled", !isValid): Login button is disabled by default and enabled only after successful validation of all fields.
sessionStorage.setItem("user", $("#usernames").val()), window.location.href: Stores username and redirects to the calculator page if form passes validation.

calculate = (operation) => { ... }: Handles Add, Subtract, Multiply, and Divide based on the operation parameter.
if (!isFinite(result)): Displays a message for division by zero or infinite results.
$("#reset").click(() => { ... }): Clears input fields, result field, and hides error messages.

$('#datePicker').val(today): Displays today’s date and allows selection of past/future dates.
await startStopwatch(), runTimer(): Uses async/await with Promises to handle timer start and intervals.
stopStopwatch(): Pauses the stopwatch and stores elapsed time in pausedTime.
resetStopwatch(): Resets time display and clears stored variables.
formatTime = (hours, minutes, seconds) => { ... }: Displays time in HH:MM:SS format.