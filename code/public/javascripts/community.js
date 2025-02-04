const vueApp = new Vue({
    el : "#app",
    data : {
        baseURL : "http://localhost:8080",
        loggedIn: false,
        formData : {
            firstName : '',
            lastName : '',
            feedback : ''
        },
        users: [],
        visibleUsers: [],
        pageOffsets: [0, 4, 8], // Adjust based on your pagination logic
        currentPage: 0,
    },
    mounted() {
        this.checkLoginStatus();  // Call the method when the component is mounted
        this.fetchUsers();
    },
    methods: {
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

        display_feedback_cards(startIndex){
            if (!this.users || this.users.length === 0) {
                console.warn('No users available to display');
                return;
            }
            this.currentPage = startIndex;
            const visibleUsers = this.users.slice(startIndex, startIndex + 4);
            this.visibleUsers = visibleUsers; // Update a reactive property

        },

        async fetchUsers() {
            try {
                const response = await fetch('/community/feedbacks');
                this.users = await response.json();
                for (let i = 0; i < Math.min(4, this.users.length); i++){
                    this.visibleUsers.push(this.users[i]);
                }

            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

        nextPage() {
            if (this.currentPage < this.pageOffsets.length - 1) {
                this.currentPage++;
                this.display_feedback_cards(this.currentPage);
            }
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
                this.display_feedback_cards(this.currentPage);
            }
        },

        async checkLoginStatus() {  // Method to check user login status
            try {
                const response = await fetch("/accounts/login-status");  // Send a request to the server to check login status
                const data = await response.json();  // Parse the JSON response

                this.loggedIn = data.loggedIn;  // Update the loggedIn data property
            } catch (error) {
                console.error(error);  // Log error to console
            }
        },

        //Create a function which accepts the starting index from where the loop iterates till 4 times to return the

        async register_record(){ //Method to register the user's feedback in the database
            try {
                const response = await fetch("/community/register", {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json" //Set the request header to indicate the JSON payload
                    },
                    body : JSON.stringify({
                        firstName : this.formData.firstName,
                        lastName : this.formData.lastName,
                        feedback : this.formData.feedback
                    })
                });

                //Check for exceptions
                if (!response.ok){
                    throw new Error("User doesn't have an account!")
                }

                alert("Feedback Added!")

                //Reset the above entities
                this.formData.firstName = '';
                this.formData.lastName = '';
                this.formData.feedback = '';

                window.location.reload();
                return;
            }
            catch (error){
                console.error(error);
                alert("User doesn't have an account!");
                return;
            }
        },
    }
});