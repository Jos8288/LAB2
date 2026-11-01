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
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const topicInput = document.querySelector("#topic");
const topicError = document.querySelector("#topic-error");

// Function to check if the full name is valid:
function validateFullName(name) {
    const trimmedName = name.trim();

    // Allow international letters, spaces, apostrophes and hyphens
    const namePattern = /^[\p{L}\p{M} '-]+$/u;

    // The name must contain at least 2 characters:
    return trimmedName.length >= 2 && namePattern.test(trimmedName);
}

// Check if the email has a valid format
function validateEmail(email) {
    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(trimmedEmail);
}

// Check if a topic has been selected
function validateTopic(topic) {
    return topic !== "";
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

// Validate the email when the user leaves the field
emailInput.addEventListener("blur", function () {
    if (validateEmail(emailInput.value)) {
        clearFieldError(emailInput, emailError);
    } else {
        showFieldError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );
    }
});

// Update the email validation when the user edits the field
emailInput.addEventListener("input", function () {
    if (validateEmail(emailInput.value)) {
        clearFieldError(emailInput, emailError);
    } else if (emailInput.classList.contains("input-error")) {
        showFieldError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );
    }
});

// Validate the topic when the user selects an option
topicInput.addEventListener("change", function () {
    if (validateTopic(topicInput.value)) {
        clearFieldError(topicInput, topicError);
    } else {
        showFieldError(
            topicInput,
            topicError,
            "Please choose a topic."
        );
    }
});

// Validate the topic when the user leaves the field
topicInput.addEventListener("blur", function () {
    if (!validateTopic(topicInput.value)) {
        showFieldError(
            topicInput,
            topicError,
            "Please choose a topic."
        );
    }
});