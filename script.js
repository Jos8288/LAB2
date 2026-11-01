/* ==================================================
   LAB 2 - FEEDBACK FORM
================================================== */

/*
   JavaScript for the feedback form:
*/

// Select the form elements:
const feedbackForm = document.querySelector("#feedback-form");
const fullNameInput = document.querySelector("#full-name");
const nameError = document.querySelector("#name-error");

// Function to check if the full name is valid:
function validateFullName(name) {
    const trimmedName = name.trim();

    // Allow international letters, spaces, apostrophes and hyphens
    const namePattern = /^[\p{L}\p{M} '-]+$/u;

    // The name must contain at least 2 characters:
    return trimmedName.length >= 2 && namePattern.test(trimmedName);
}

// Show an error message when a field is invalid
function showFieldError(input, errorElement, message) {
    input.classList.add("input-error");
    input.classList.remove("input-success");

    input.setAttribute("aria-invalid", "true");
    errorElement.textContent = message;
}

// Remove the error message when a field is valid
function clearFieldError(input, errorElement) {
    input.classList.remove("input-error");
    input.classList.add("input-success");

    input.setAttribute("aria-invalid", "false");
    errorElement.textContent = "";
}

// Validate the name when the user leaves the field
fullNameInput.addEventListener("blur", function () {
    if (validateFullName(fullNameInput.value)) {
        clearFieldError(fullNameInput, nameError);
    } else {
        showFieldError(
            fullNameInput,
            nameError,
            "Please enter a valid name with at least 2 characters."
        );
    }
});

// Update the validation when the user edits an invalid name
fullNameInput.addEventListener("input", function () {
    if (validateFullName(fullNameInput.value)) {
        clearFieldError(fullNameInput, nameError);
    } else if (fullNameInput.classList.contains("input-error")) {
        showFieldError(
            fullNameInput,
            nameError,
            "Please enter a valid name with at least 2 characters."
        );
    }
});