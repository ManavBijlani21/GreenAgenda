const vueApp = new Vue({
    el : "#app",
    data : {
        baseURL : "http://localhost:8080",
        posts1 : [
            {
                title: "Title 1, most recent post",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque velit ut lacinia efficitur. Nam vitae aliquet massa. Proin mollis ante sem, nec posuere velit pellentesque vehicula. Proin rutrum, tellus a vulputate tincidunt, mauris turpis porttitor ante, non mattis elit est id augue. Vestibulum venenatis facilisis nibh, eget pharetra leo elementum non. Suspendisse eros est, tempus sit amet lobortis in, tempus nec sem.",
                timestamp: "21:20",
                date: "16/05/2024",
                location: "Event occuring at Math Lawns University of Adelaide", //some kind of descriptor the manager gave, not necesserily an address
                email_id: "example_manager_branch1@gmail.com", //email of the manager who posted this for the branch so who to email about event
                branch_id: "", //just the id of the branch which will be removed by the server before it reaches the client
                RSVP: true
            },
            {
                title: "Title 2, second most recent post",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque velit ut lacinia efficitur. Nam vitae aliquet massa. Proin mollis ante sem, nec posuere velit pellentesque vehicula. Proin rutrum, tellus a vulputate tincidunt, mauris turpis porttitor ante, non mattis elit est id augue. Vestibulum venenatis facilisis nibh, eget pharetra leo elementum non. Suspendisse eros est, tempus sit amet lobortis in, tempus nec sem.",
                timestamp: "21:20",
                date: "16/05/2023",
                location: "Event occuring at Math Lawns University of Adelaide", //some kind of descriptor the manager gave, not necesserily an address
                email_id: "example_manager_branch2@gmail.com", //email of the manager who posted this for the branch so who to email about event
                branch_id: "", //just the id of the branch which will be removed by the server before it reaches the client
                RSVP: false
            },
            {
                title: "Title 3, third most recent post",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque velit ut lacinia efficitur. Nam vitae aliquet massa. Proin mollis ante sem, nec posuere velit pellentesque vehicula. Proin rutrum, tellus a vulputate tincidunt, mauris turpis porttitor ante, non mattis elit est id augue. Vestibulum venenatis facilisis nibh, eget pharetra leo elementum non. Suspendisse eros est, tempus sit amet lobortis in, tempus nec sem.",
                timestamp: "21:20",
                date: "16/05/2022",
                location: "Event occuring at Math Lawns University of Adelaide", //some kind of descriptor the manager gave, not necesserily an address
                email_id: "example_manager_branch3@gmail.com", //email of the manager who posted this for the branch so who to email about event
                branch_id: "", //just the id of the branch which will be removed by the server before it reaches the client
                RSVP: false
            }
        ],
        test: "",
        loadPosts: true,
        search: "",
        loggedIn: false,
        admin: {
            branches: []
        }
    },
    mounted() {
        this.checkLoginStatus();  // Call the method when the component is mounted
        this.fetchBranches();
    },
    computed: {
        posts: function () {
            if (this.loadPosts !== true) return [];
            var ans = [];

            for (let post of this.posts1) {
                if (JSON.stringify(post).includes(this.search)) ans.push(post);
            }
            return ans;
        }
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
        //this method just extists for testing purposes not related to first milestone submission
        RSVP: function () {
            console.log("Hello World!");
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                vueApp.test = this.responseText;
                console.log(vueApp.test);
            };
            xhttp.open("GET", this.baseURL + "/test", true); //first is the type of request in caps, then the url
            xhttp.send();
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