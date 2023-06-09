

// This is structure of HTML
// <div id="navbar">
//     <a id="signin-link" href="#">Sign In</a>
//     <a id="signup-link" href="#">Sign Up</a>
// </div>


// Check if the user is logged in (e.g., by checking a session or local storage)
var isLoggedIn = true; // Change this value based on your login state

// Function to update the links
function updateLinks() {
    var signinLink = document.getElementById('signin-link');
    var signupLink = document.getElementById('signup-link');

    if (isLoggedIn) {
        signinLink.innerHTML = 'User';
        signupLink.innerHTML = 'Log Out';
        // Add the appropriate event listeners for the log out functionality
        signupLink.addEventListener('click', logout);
    } else {
        signinLink.innerHTML = 'Sign In';
        signupLink.innerHTML = 'Sign Up';
    }
}

// Function to handle the log out functionality
function logout() {
    // Perform the log out actions (e.g., clearing session or local storage)
    isLoggedIn = false;
    updateLinks(); // Update the links after logging out
}

// Call the function to initially set up the links
updateLinks();
