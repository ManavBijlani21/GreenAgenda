const vueApp = new Vue({
    el: "#app",
    data: {
        posts: [
            {
                title: "Title 1, most recent post",
                description: "Some descriptive text",
                timestamp: "21:20",
                date: "16/05/2024",
                location: "Event occuring at Math Lawns University of Adelaide", //some kind of descriptor the manager gave, not necesserily an address
                email_id: "example_manager_branch1@gmail.com", //email of the manager who posted this for the branch so who to email about event
                branch_id: "" //just the id of the branch which will be removed by the server before it reaches the client
            },
            {
                title: "Title 2, most recent post",
                description: "Some descriptive text",
                timestamp: "21:20",
                date: "16/05/2023",
                location: "Event occuring at Math Lawns University of Adelaide", //some kind of descriptor the manager gave, not necesserily an address
                email_id: "example_manager_branch2@gmail.com", //email of the manager who posted this for the branch so who to email about event
                branch_id: "" //just the id of the branch which will be removed by the server before it reaches the client
            },
            {
                title: "Title 3, most recent post",
                description: "Some descriptive text",
                timestamp: "21:20",
                date: "16/05/2022",
                location: "Event occuring at Math Lawns University of Adelaide", //some kind of descriptor the manager gave, not necesserily an address
                email_id: "example_manager_branch3@gmail.com", //email of the manager who posted this for the branch so who to email about event
                branch_id: "" //just the id of the branch which will be removed by the server before it reaches the client

            }
        ]
    },
    computed: {
    },
    methods: {

    }
});