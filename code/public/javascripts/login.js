const vueApp = new Vue({
    el : "#app",
    data : {
        email : "",
        password : "",
        admin: {
            branches: []
        },
        loggedIn: false
    },
    mounted() {
        this.checkLoginStatus();  // Call the method when the component is mounted
        this.fetchBranches();
    },
    computed : {
    },
    methods : {
        logOut(){
            fetch('/accounts/logout')
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn === false){
                    alert("Logged out successfully!");
                    window.location.href = '/';
                }
            })
            .catch(error => {
                alert('Log out failed!');
                console.error('Error: ', error);
            });
        },
        fetchBranches() {
            fetch('/accounts/branches')
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    } else {
                        this.admin.branches = data.branches;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        async login() {  // Method to handle user login
            try {
                const response = await fetch("/accounts/login", {
                    method: "POST",  // Set the HTTP method to POST
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body : JSON.stringify({  // Convert the data to JSON string
                        email : this.email,
                        password : this.password
                    })
                });

                if (!response.ok) {  // Check if the response is not OK
                    throw new Error("Login failed");  // Throw an error if login failed
                }

                alert("Login success");  // Show success alert
                window.location.href = "/";  // Redirect to the home page after successful login

            } catch (error) {
                console.error(error);  // Log error to console
                alert("Login failed");  // Show failure alert
            }
        },
        async checkLoginStatus() {  // Method to check user login status
            try {
                const response = await fetch("/accounts/login-status");  // Send a request to the server to check login status
                const data = await response.json();  // Parse the JSON response
                if (data.loggedIn) {
                    alert("You are already logged in");  // Show alert if the user is already logged in
                    window.location.href = "/"; // Redirect to the home page if the user is already logged in
                }
            } catch (error) {
                console.error(error);  // Log error to console
            }
        }
    }
});