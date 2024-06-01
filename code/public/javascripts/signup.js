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
        async signUp() {
            try {
                const response = await fetch("/account/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
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

                if (!response.ok) {
                    throw new Error("Signup failed");
                }

                alert("Signup success");

                window.location.href = "/login";
            } catch (error) {
                console.error(error);
                alert("Signup failed");
            }
        }

    }
});