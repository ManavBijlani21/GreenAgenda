const vueApp = new Vue({
    el: "#app",
    data: {
        baseURL: "http://localhost:8080",
        loaded: true,
        loggedIn: false,
        branchName: ''
    },
    mounted() {
        this.checkLoginStatus();
    },
    computed: {},
    methods: {
        async checkLoginStatus() {  // Method to check user login status
            try {
                const response = await fetch("/users/login-status");  // Send a request to the server to check login status
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();  // Parse the JSON response
                console.log(data);
                this.loggedIn = data.loggedIn;  // Update the loggedIn data property
                if (!this.loggedIn) {
                    this.redirectToLogin();
                }
            } catch (error) {
                console.error('Error fetching login status:', error);
                this.redirectToLogin();  // Redirect on error
            }
        },
        redirectToLogin() {
            window.location.href = "/login";  // Redirect to login page
        },
        async getLogIn() {
            console.log(this.branchName);
            try {
                const response = await fetch('/branches/join', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ branchName: this.branchName })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data); 
            } catch (error) {
                console.error('Error joining branch:', error);
            }
        }
    }
});
