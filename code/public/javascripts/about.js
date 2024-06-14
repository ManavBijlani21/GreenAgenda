const vueApp = new Vue({
    el : "#app",
    data : {
        loggedIn : false,
        admin: {
            branches: []
        }
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
        async checkLoginStatus() {  // Method to check user login status
            try {
                const response = await fetch("/accounts/login-status");  // Send a request to the server to check login status
                const data = await response.json();  // Parse the JSON response

                this.loggedIn = data.loggedIn;  // Update the loggedIn data property
            } catch (error) {
                console.error(error);  // Log error to console
            }
        }

    }
});