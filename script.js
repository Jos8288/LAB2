/* ==================================================
   LAB 2 - FEEDBACK FORM
================================================== */

/*
   JavaScript for the feedback form.
   Additional validation and interactions will be added later.
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