const vueApp = new Vue({
    el: "#app",
    data: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        postCode: ""
    },
    computed: {
    },
    methods: {
        async signUp() {  // Method to handle user signup
            try {
                const response = await fetch("/account/signup", {
                    method: "POST",  // Set the HTTP method to POST
                    headers: {
                        "Content-Type": "application/json"  // Set the request header to indicate JSON payload
                    },
                    body: JSON.stringify({  // Convert the data to JSON string
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password,
                        phone: this.phone,
                        streetAddress: this.streetAddress,
                        city: this.city,
                        state: this.state,
                        postCode: this.postCode
                    })
                });

                if (!response.ok) {  // Check if the response is not OK
                    throw new Error("Signup failed");  // Throw an error if signup failed
                }

                alert("Signup success");  // Show success alert

                window.location.href = "/login";  // Redirect to login page after successful signup
            } catch (error) {
                console.error(error);  // Log error to console
                alert("Signup failed");  // Show failure alert
            }
        }
    }
});

