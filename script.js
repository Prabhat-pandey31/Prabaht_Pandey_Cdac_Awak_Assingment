document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const spinner = document.querySelector('.spinner'); // Get the spinner element
  
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  
    // Validation variables
    let isValid = true;

    // Validate username
    if (!usernameInput.value || !/\S+@\S+\.\S+/.test(usernameInput.value)) {
        const error = document.createElement('p');
        error.textContent = 'Please enter a valid email address.';
        error.classList.add('error-message');
        usernameInput.parentElement.appendChild(error);
        isValid = false;
    }
  
    // Validate password
    if (!passwordInput.value || passwordInput.value.length < 6) {
        const error = document.createElement('p');
        error.textContent = 'Password should be at least 6 characters long.';
        error.classList.add('error-message');
        passwordInput.parentElement.appendChild(error);
        isValid = false;
    }
  
    // If form is valid, make API call
    if (isValid) {
        // Show the spinner
        spinner.style.display = 'block';
  
        // Make API call
        fetch('https://jsonplaceholder.typicode.com/posts', { // Replace with your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: usernameInput.value,
                password: passwordInput.value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Hide the spinner
            spinner.style.display = 'none';
  
            // Check if login was successful
            if (usernameInput.value === 'prabhatpandey3105@gmail.com' && passwordInput.value === 'Prabhat@123') {
                // Display success message
                const message = document.createElement('div');
                message.textContent = 'Login successful!';
                message.style.color = 'green';
                document.querySelector('.signin .content').appendChild(message);
            } else {
                // Display error message
                const message = document.createElement('div');
                message.textContent = 'Login failed. Please try again.';
                message.style.color = 'red';
                document.querySelector('.signin .content').appendChild(message);

                // Alert the user
                alert('Login failed. Please check the credentials and try again.');

        
            }
        })
        .catch(error => {
            // Hide the spinner
            spinner.style.display = 'none';
  
            // Display error message
            const message = document.createElement('div');
            message.textContent = 'Login failed. Please try again.';
            message.style.color = 'red';
            document.querySelector('.signin .content').appendChild(message);
  
            // Alert the user
            alert('Login failed. Please try again.');

            // Refresh the page after 5 seconds
            
        });
        setTimeout(() => {
            window.location.reload();
        }, 5000); // 5000 milliseconds = 5 seconds
    }
});

// Handle Show Password checkbox
document.getElementById('showPassword').addEventListener('change', function() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = this.checked ? 'text' : 'password';
});

