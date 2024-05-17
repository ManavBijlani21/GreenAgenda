const vueApp = new Vue({
    el: "#app",
    data: {
        baseURL: "http://localhost:8080",
        loaded: true,
        loggedIn: true
    },
    computed: {
    },
    methods: {
        getLogIn: function(){
            console.log("Hello World!");
        }
    }
});