/* ==================================================
   LAB 2 - FEEDBACK FORM
================================================== */

// Select the form elements:
const feedbackForm = document.querySelector("#feedback-form");
const fullNameInput = document.querySelector("#full-name");
const nameError = document.querySelector("#name-error");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const topicInput = document.querySelector("#topic");
const topicError = document.querySelector("#topic-error");
const commentsInput = document.querySelector("#comments");
const commentsError = document.querySelector("#comments-error");
const commentsCounter = document.querySelector("#comments-counter");
const websiteInput = document.querySelector("#website");
const websiteError = document.querySelector("#website-error");
const formStatus = document.querySelector("#form-status");

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

// Check if the comment contains at least 15 characters and max 40 characters:
// I updated this function to check both the minimum and maximum length using if, else if and else statements.
// The function returns true for a valid length and false otherwise.
// I use trim() to remove spaces at the beginning and end and .length to count the remaining characters.

function validateComments(comments) {
    const characterCount = comments.trim().length;

    if (characterCount < 15) {
        return false;
    } else if (characterCount <= 40) {
        return true;
    } else {
        return false;
    }
}

// Check the website using the browser's built-in URL validation
function validateWebsite() {
    return websiteInput.value.trim() === "" || websiteInput.validity.valid;
}

// Update the character counter while typing:
// I updated the character counter to show the new 15-40 character limit.
// I added if, else if and else statements to check the length and change the counter color and message.
// Text turns red if it is too short or too long and green when the comment has a valid length.
function updateCommentsCounter() {
    const characterCount = commentsInput.value.trim().length;

    commentsCounter.textContent =
        `${characterCount} characters (15-40 allowed)`;

    if (characterCount <15) {
        commentsCounter.style.color = "#b42318";
        commentsCounter.textContent += " - Text is too short";
     } else if (characterCount <= 40) {
        commentsCounter.style.color = "#287d57";
        commentsCounter.textContent += " - Valid length";
    } else {
        commentsCounter.style.color = "#b42318";
        commentsCounter.textContent += " - Maximum 40 characters allowed";
    }
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
            "Please enter a valid name using at least 2 letters."
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
            "Please enter a valid name using at least 2 letters."
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

// Update the counter whenever the comment changes:
// I updated this eventlistener to check the new character limits while the user types.
// I use if and else if statements to check whether the comment is valid, already has an error or exceeds 40 characters.
// I also use a separate if/else statement to choose the correct error message when the comment is too short or too long.
// The error disappears when the comment has a valid length.
commentsInput.addEventListener("input", function () {
    updateCommentsCounter();

    const characterCount = commentsInput.value.trim().length;

    if (validateComments(commentsInput.value)) {
        clearFieldError(commentsInput, commentsError);
    } else if (commentsInput.classList.contains("input-error")) {
        if (characterCount < 15) {
            showFieldError(
                commentsInput,
                commentsError,
                "Please enter at least 15 characters."
        );
    } else {
            showFieldError(
                commentsInput,
                commentsError,
                "Please enter a maximum of 40 characters."
            );
        }
    } else if (characterCount > 40) {
        showFieldError(
            commentsInput,
            commentsError,
            "Please enter a maximum of 40 characters."
        );
    }
});

// Validate the comment when the user leaves the field:
// I updated this eventlistener to check both the minimum and maximum limits using if, else if and else statements.
// When the user leaves the field, it checks if the comment is too short, valid or too long and shows the correct feedback.
commentsInput.addEventListener("blur", function () {
    const characterCount = commentsInput.value.trim().length;

    if (characterCount < 15) {
        showFieldError(
            commentsInput,
            commentsError,
            "Please enter at least 15 characters."
        );
    } else if (characterCount <= 40) {
        clearFieldError(commentsInput, commentsError);
    } else {
        showFieldError(
            commentsInput,
            commentsError,
            "Please enter a maximum of 40 characters."
        );
    }
});

// Validate the website when the user leaves the field
websiteInput.addEventListener("blur", function () {
    if (validateWebsite()) {
        clearFieldError(websiteInput, websiteError);
    } else {
        showFieldError(
            websiteInput,
            websiteError,
            "Please enter a valid URL, including https://."
        );
    }
});

// Update the validation when the website is edited
websiteInput.addEventListener("input", function () {
    if (validateWebsite()) {
        clearFieldError(websiteInput, websiteError);
    } else if (websiteInput.classList.contains("input-error")) {
        showFieldError(
            websiteInput,
            websiteError,
            "Please enter a valid URL, including https://."
        );
    }
});

// Validate all fields before submitting the form
function validateForm() {
    let isValid = true;

    if (!validateFullName(fullNameInput.value)) {
        showFieldError(
            fullNameInput,
            nameError,
            "Please enter a valid name with at least 2 characters."
        );
        isValid = false;
    } else {
        clearFieldError(fullNameInput, nameError);
    }
    
    if (!validateEmail(emailInput.value)) {
        showFieldError(
            emailInput,
            emailError,
            "Please enter a valid email address."
        );
        isValid = false;
    } else {
        clearFieldError(emailInput, emailError);
    }

    if (!validateTopic(topicInput.value)) {
        showFieldError(
            topicInput,
            topicError,
            "Please choose a topic."
        );
        isValid = false;
    } else {
        clearFieldError(topicInput, topicError);
    }

    // I updated the Comments validation before submitting the form.
    // I use if, else if and else to check the character count.
    // The form is only valid if the comment contains 15-40 characters.
    const characterCount = commentsInput.value.trim().length;

        if (characterCount < 15) {
            showFieldError(
                commentsInput,
                commentsError,
                "Please enter at least 15 characters."
        );
        isValid = false;
        } else if (characterCount <= 40) {
            clearFieldError(commentsInput, commentsError);
        } else {
            showFieldError(
                commentsInput,
                commentsError,
                "Please enter a maximum of 40 characters."
            );
        isValid = false;
    }

    if (!validateWebsite()) {
        showFieldError(
            websiteInput,
            websiteError,
            "Please enter a valid URL, including https://."
        );
        isValid = false;
    } else if (websiteInput.value.trim() !== "") {
        clearFieldError(websiteInput, websiteError);
    }

    return isValid;
}

// Clear validation messages and visual feedback
function clearFormState() {
    const fields = [
        [fullNameInput, nameError],
        [emailInput, emailError],
        [topicInput, topicError],
        [commentsInput, commentsError],
        [websiteInput, websiteError]
    ];

    fields.forEach(function (field) {
        const input = field[0];
        const errorElement = field[1];

        input.classList.remove("input-error", "input-success");
        input.removeAttribute("aria-invalid");
        errorElement.textContent = "";
    });

    // I updated the counter text to show the new 15-40 character limit.
    commentsCounter.textContent = "0 characters (15–40 allowed)";
    commentsCounter.style.color = "";

    formStatus.textContent = "";
}

// Reset the form and all validation feedback
function resetForm() {
    feedbackForm.reset();
    clearFormState();
}

// Check the form when the Submit button is clicked
feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formStatus.textContent = "";

    if (validateForm()) {
        const fullName = fullNameInput.value.trim();

        resetForm();

        formStatus.textContent =
            `Thanks for your feedback, ${fullName}!`;

        setTimeout(function () {
            formStatus.textContent = "";
        }, 4000);
    }
});

// Restore the initial form state when Clear is clicked
feedbackForm.addEventListener("reset", function () {
    clearFormState();
});