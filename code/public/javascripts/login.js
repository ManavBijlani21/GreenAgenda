const vueApp = new Vue({
    el: "#app",
    data: {
        email: "",
        password: ""
    },
    computed: {
    },
    methods: {
        async login() {  // Method to handle user login
            try {
                const response = await fetch("/account/login", {
                    method: "POST",  // Set the HTTP method to POST
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({  // Convert the data to JSON string
                        email: this.email,
                        password: this.password
                    })
                });

                if (!response.ok) {  // Check if the response is not OK
                    throw new Error("Login failed");  // Throw an error if login failed
                }

                const data = await response.json();  // Parse the JSON response
                alert("Login success");  // Show success alert

                localStorage.setItem("authToken", data.token);  // Store the authentication token in local storage

                window.location.href = "/";  // Redirect to the home page after successful login
            } catch (error) {
                console.error(error);  // Log error to console
                alert("Login failed");  // Show failure alert
            }
        }
    }
});