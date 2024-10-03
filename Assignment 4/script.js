document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    const submitButton = document.getElementById('submitButton');
    const resultTable = document.getElementById('resultTable').querySelector('tbody');
    const resultTableContainer = document.getElementById('resultTableContainer');
    const drinkSelect = document.getElementById('drink');
    const largeSizeCheckbox = document.getElementById('largeSize');
    const largeSizeLabel = document.getElementById('largeSizeLabel');
    const customizationsLabel = document.getElementById('customizationsLabel');
    const customizationsTextarea = document.getElementById('customizations');
    const customizationsError = document.getElementById('customizationsError');

    // Disable the submit button initially
    submitButton.disabled = true;

    // Function to append submitted data to the result table
    function appendToTable(data) {
        const newRow = resultTable.insertRow();
        data.forEach(value => {
            const cell = newRow.insertCell();
            cell.textContent = value;
        });
    }

    // Function to validate the form
    function validateForm() {
        let isValid = true;

        // Validate first name (Min length: 2, Max length: 20)
        const firstName = document.getElementById('firstName').value.trim();
        const firstNameError = document.getElementById('firstNameError');
        if (firstName.length < 2 || firstName.length > 20 || !/^[a-zA-Z]+$/.test(firstName)) {
            firstNameError.textContent = 'First name must be 2-20 characters, no special characters';
            firstNameError.style.display = 'inline';
            isValid = false;
        } else {
            firstNameError.style.display = 'none';
        }

        // Validate last name (Min length: 2, Max length: 20)
        const lastName = document.getElementById('lastName').value.trim();
        const lastNameError = document.getElementById('lastNameError');
        if (lastName.length < 2 || lastName.length > 20 || !/^[a-zA-Z]+$/.test(lastName)) {
            lastNameError.textContent = 'Last name must be 2-20 characters, no special characters';
            lastNameError.style.display = 'inline';
            isValid = false;
        } else {
            lastNameError.style.display = 'none';
        }

        // Validate email (restrict domain to @northeastern.edu)
        const emailId = document.getElementById('emailId').value.trim();
        const emailIdError = document.getElementById('emailIdError');
        if (!emailId || !/^[\w.-]+@northeastern\.edu$/.test(emailId)) {
            emailIdError.textContent = 'Email must be a valid @northeastern.edu email';
            emailIdError.style.display = 'inline';
            isValid = false;
        } else {
            emailIdError.style.display = 'none';
        }

        // Validate phone number (Format: xxx-xxx-xxxx)
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        const phoneNumberError = document.getElementById('phoneNumberError');
        if (!phoneNumber || !/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
            phoneNumberError.textContent = 'Phone number must be in the format xxx-xxx-xxxx';
            phoneNumberError.style.display = 'inline';
            isValid = false;
        } else {
            phoneNumberError.style.display = 'none';
        }

        // Validate address (Max length: 50)
        const address = document.getElementById('address').value.trim();
        const addressError = document.getElementById('addressError');
        if (!address || address.length > 50) {
            addressError.textContent = 'Address is required and must be less than 50 characters';
            addressError.style.display = 'inline';
            isValid = false;
        } else {
            addressError.style.display = 'none';
        }

        // Validate city (Max length: 30)
        const city = document.getElementById('city').value.trim();
        const cityError = document.getElementById('cityError');
        if (!city || city.length > 30 || !/^[a-zA-Z\s]+$/.test(city)) {
            cityError.textContent = 'City is required and must be less than 30 characters, no special characters';
            cityError.style.display = 'inline';
            isValid = false;
        } else {
            cityError.style.display = 'none';
        }

        // Validate state (Max length: 20)
        const state = document.getElementById('state').value.trim();
        const stateError = document.getElementById('stateError');
        if (!state || state.length > 20 || !/^[a-zA-Z\s]+$/.test(state)) {
            stateError.textContent = 'State is required and must be less than 20 characters, no special characters';
            stateError.style.display = 'inline';
            isValid = false;
        } else {
            stateError.style.display = 'none';
        }

        // Validate zip code (5 digits)
        const zipcode = document.getElementById('zipcode').value.trim();
        const zipcodeError = document.getElementById('zipcodeError');
        if (!zipcode || !/^\d{5}$/.test(zipcode)) {
            zipcodeError.textContent = 'Zip code must be 5 digits';
            zipcodeError.style.display = 'inline';
            isValid = false;
        } else {
            zipcodeError.style.display = 'none';
        }

        // Validate customizations if large size is checked
        if (largeSizeCheckbox.checked && !customizationsTextarea.value.trim()) {
            customizationsError.textContent = 'Please write customizations or N/A';
            customizationsError.style.display = 'inline';
            isValid = false;
        } else {
            customizationsError.style.display = 'none';
        }

        // Validate comments (Min length: 5)
        const comments = document.getElementById('comments').value.trim();
        const commentsError = document.getElementById('commentsError');
        if (comments.length < 5) {
            commentsError.textContent = 'Comments must be at least 5 characters long';
            commentsError.style.display = 'inline';
            isValid = false;
        } else {
            commentsError.style.display = 'none';
        }

        // Disable the submit button if any validation fails
        submitButton.disabled = !isValid;
    }

    // Show or hide customization options based on selections
    function toggleCustomizations() {
        if (drinkSelect.value) {
            largeSizeCheckbox.parentElement.classList.remove('hidden');
            largeSizeLabel.textContent = `${drinkSelect.value} Large ($1 Extra)`;
            if (largeSizeCheckbox.checked) {
                customizationsLabel.classList.remove('hidden');
                customizationsTextarea.classList.remove('hidden');
            } else {
                customizationsLabel.classList.add('hidden');
                customizationsTextarea.classList.add('hidden');
                customizationsError.style.display = 'none';
            }
        } else {
            largeSizeCheckbox.parentElement.classList.add('hidden');
            customizationsLabel.classList.add('hidden');
            customizationsTextarea.classList.add('hidden');
            customizationsError.style.display = 'none';
            largeSizeCheckbox.checked = false; // Uncheck large size on drink change
        }
    }

    // Event listeners for form validation
    form.addEventListener('keyup', validateForm);
    form.addEventListener('input', validateForm);
    form.addEventListener('change', validateForm);

    // Reset fields when drink is changed
    drinkSelect.addEventListener('change', function () {
        toggleCustomizations();
        customizationsTextarea.value = ''; // Clear customizations
        largeSizeCheckbox.checked = false; // Uncheck large size
        validateForm(); // Re-validate the form
    });

    largeSizeCheckbox.addEventListener('change', toggleCustomizations);

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const formData = [
            document.querySelector('input[name="title"]:checked').value,
            document.getElementById('firstName').value,
            document.getElementById('lastName').value,
            document.getElementById('emailId').value,
            document.getElementById('phoneNumber').value,
            document.getElementById('address').value + ' ' + (document.getElementById('streetAddress2').value || 'N/A'),
            document.getElementById('city').value,
            document.getElementById('state').value,
            document.getElementById('zipcode').value,
            drinkSelect.value,
            customizationsTextarea.value || 'N/A',
            document.getElementById('comments').value
        ];

        // Append the data to the table
        appendToTable(formData);

        // Show the result table
        resultTableContainer.classList.remove('hidden');

        // Clear the form after submission
        form.reset();
        submitButton.disabled = true; // Disable the button again after reset
    });
});
