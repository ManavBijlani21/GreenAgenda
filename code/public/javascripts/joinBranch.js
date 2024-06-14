const vueApp = new Vue({
    el: "#app",
    data: {
        baseURL: "http://localhost:8080",
        loaded: true,
        loggedIn: true,
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
                console.log(data);  // Debugging: Log the response data
                this.loggedIn = data.loggedIn;  // Update the loggedIn data property
                if (!this.loggedIn) {
                    this.redirectToLogin();
                }
            } catch (error) {
                console.error('Error fetching login status:', error);  // Log error to console
                this.redirectToLogin();  // Redirect on error
            }
        },
        redirectToLogin() {
            window.location.href = "/login";  // Redirect to login page
        },
        async fetchBranches() {
            if (this.branchName.length === 0) {
                this.filteredBranches = [];
                this.showDropdown = false;
                return;
            }

            try {
                const response = await fetch(`/branches/search?query=${encodeURIComponent(this.branchName)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);  // Log the response data for testing
                this.filteredBranches = data.branches;
                this.showDropdown = true;
            } catch (error) {
                console.error('Error fetching branches:', error);  // Log error to console
            }
        },
        hideDropdown() {
            setTimeout(() => {
                this.showDropdown = false;
            }, 200);
        },
        selectBranch(branchName) {
            this.branchName = branchName;
            this.showDropdown = false;
        },
        async getLogIn() {
            try {
                const response = await fetch("/branches/join", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        branchName: this.branchName  // Send the branch name
                    })
                });
                const data = await response.json();
                console.log(data);  // Log the response data for testing
                if (data.success) {
                    alert(`Successfully joined branch!`);
                } else {
                    alert(`Failed to join branch: ${data.error}`);
                }
            } catch (error) {
                console.error('Error joining branch:', error);  // Log error to console
                alert('An error occurred while joining the branch.');
            }
        }
    }
});
