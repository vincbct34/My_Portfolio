// Select the form element using its tag
const form = document.querySelector('form');

// Retrieve inputs by their IDs
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

// Add a submit event listener to the form to perform actions when the form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const isValid = checkInputs(); // Validate all inputs
  const isEmailValid = checkEmail(); // Validate the email specifically

  if (isValid && isEmailValid) {
    sendEmail(); // Send the email if all validations pass
    clearInputs(); // Clear the form inputs after sending the email
  } else {
    // If validations fail, display an error message using SweetAlert
    Swal.fire({
      title: "Oops...",
      text: "Please fill in all fields correctly!",
      icon: "error"
    });
  }
});

// Function to validate the email format
function checkEmail() {
  const emailPattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/i; // Regex for email validation
  const errorTxtEmail = document.querySelector(".error-txt.email"); // Select the element to display the error message for email

  // Check if the email matches the pattern
  if (!email.value.match(emailPattern)) {
    email.classList.add("error"); // Add error styling to the email input
    email.parentElement.classList.add("error"); // Add error styling to the parent element
    errorTxtEmail.classList.add("active"); // Show the error message
    errorTxtEmail.innerText = email.value ? "Please enter a valid email address" : "Email can't be blank";
    return false;
  } else {
    email.classList.remove("error"); // Remove error styling if email is valid
    email.parentElement.classList.remove("error"); // Remove error styling from the parent element
    errorTxtEmail.classList.remove("active"); // Hide the error message
    return true;
  }
}

// Function to check if all required inputs are not empty
function checkInputs() {
  const items = document.querySelectorAll(".item"); // Select all input elements with class 'item'
  let allValid = true; // Flag to check if all inputs are valid

  items.forEach(item => {
    const errorText = item.nextElementSibling; // Select the sibling element for error message
    if (item.value === "") {
      item.classList.add("error"); // Add error styling if the input is empty
      errorText.classList.add("active");
      errorText.innerText = item.placeholder + " can't be blank"; // Set the error message based on the placeholder
      allValid = false;
    } else {
      item.classList.remove("error"); // Remove error styling if input is not empty
      errorText.classList.remove("active");
    }
  });

  return allValid; // Return the validity of all inputs
}

// Function to send an email using SMTP settings
function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone: ${phone.value}<br> Subject: ${subject.value}<br> Message: ${message.value}`; // Construct the email body message

  Email.send({ // Send email using SmtpJS
    Host : "smtp.elasticemail.com",
    Username : "vincent260705@gmail.com",
    Password : "188BB62BC9771F72524C72C21D8CDA4C3911",
    To : "vincent260705@gmail.com",
    From : "vincent260705@gmail.com",
    Subject : subject.value,
    Body : bodyMessage
  }).then(
    message => {
      if (message == "OK") {
        clearInputs(); // Clear inputs after successful email sending
        Swal.fire({ // Display a success message using SweetAlert
          title: "All done!",
          text: "Your message has been sent!",
          icon: "success"
        });
      }
    }
  );
}

// Function to clear all input fields in the form
function clearInputs() {
  const items = document.querySelectorAll(".item"); // Select all inputs

  for (const item of items) {
    item.value = ""; // Set each input value to an empty string
  }
}
