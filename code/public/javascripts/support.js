const vueApp = new Vue({
    el : "#app",
    data : {
        loggedIn: false
    },
    mounted() {
        this.checkLoginStatus();  // Call the method when the component is mounted
    },
    computed : {
    },
    methods : {
        async checkLoginStatus() {  // Method to check user login status
            try {
                const response = await fetch("/users/login-status");  // Send a request to the server to check login status
                const data = await response.json();  // Parse the JSON response

                this.loggedIn = data.loggedIn;  // Update the loggedIn data property
            } catch (error) {
                console.error(error);  // Log error to console
            }
        }

    }
});