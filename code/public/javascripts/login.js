const vueApp = new Vue({
    el: "#app",
    data: {
        email: "",
        password: ""
    },
    computed: {
    },
    methods: {
        async login() {
            try {
                const response = await fetch("/account/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });

                if (!response.ok) {
                    throw new Error("Login failed");
                }

                const data = await response.json();
                alert("Login success");

                localStorage.setItem("authToken", data.token);

                window.location.href = "/";
            } catch (error) {
                console.error(error);
                alert("Login failed");
            }
        }
    }
});
