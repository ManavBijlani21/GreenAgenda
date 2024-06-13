const vueApp = new Vue({
    el: '#app',
    data: {
        currentSection: 'user',
        user: {
            email: '',
            password: '', // Password should not be pre-filled for security reasons
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: {
                street: '',
                streetNumber: '',
                city: '',
                state: '',
                postalCode: ''
            }
        },
        manager: {
            newEvent: {
                title: '',
                description: '',
                date: '',
                location: '',
                visibility: 'public'
            },
            modifyEvent: {
                id: '',
                title: '',
                description: '',
                date: '',
                location: '',
                visibility: 'public'
            },
            events: []
        },
        admin: {
            addBranch: {
                name: '',
                phoneNumber: '',
                email: '',
                address: {
                    street: '',
                    streetNumber: '',
                    city: '',
                    state: '',
                    postalCode: ''
                }
            },
            deleteBranch: {
                id: ''
            },
            setManager: {
                branchId: '',
                email: ''
            },
            searchQuery: '',
            users: [],
            sortKey: '',
            sortOrders: {
                firstName: 1,
                lastName: 1,
                email: 1,
                phoneNumber: 1,
                userType: 1
            },
            branches: []
        },
        editedUsers: new Set(),
        loggedIn: false,
        userType: 'user',
    },
    computed: {
        filteredUsers() {
            let users = this.admin.users;

            if (this.admin.searchQuery) {
                const query = this.admin.searchQuery.toLowerCase();
                users = users.filter(user => {
                    return user.firstName.toLowerCase().includes(query) ||
                        user.lastName.toLowerCase().includes(query) ||
                        user.email.toLowerCase().includes(query) ||
                        user.phoneNumber.toLowerCase().includes(query) ||
                        user.userType.toLowerCase().includes(query);
                });
            }

            if (this.admin.sortKey) {
                users = users.slice().sort((a, b) => {
                    let result = 0;
                    if (typeof a[this.admin.sortKey] === 'string') {
                        result = a[this.admin.sortKey].localeCompare(b[this.admin.sortKey]);
                    } else if (typeof a[this.admin.sortKey] === 'number') {
                        result = a[this.admin.sortKey] - b[this.admin.sortKey];
                    }
                    return result * this.admin.sortOrders[this.admin.sortKey];
                });
            }

            return users;
        }
    },
    mounted() {
        this.checkLoginStatus();
        this.getUserType();
        this.fetchUserInfo();
        this.fetchBranches();
    },
    methods: {
        toggleSection(section) {
            if (section == 'user' || (section == 'manager' && this.userType == 'manager') || (section == 'admin' && this.userType == 'admin')) {
                this.currentSection = section;
                if (section === 'user') {
                    this.fetchUserInfo();
                }
                if (section === 'manager') {
                    this.fetchEvents();
                }
                if (section === 'admin') {
                    this.fetchUsers();
                }
            }
        },
        saveUserChanges(user) {
            if (!user) {
                user = this.user;
            }
            fetch('/users/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    }
                    this.editedUsers.delete(user.email);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        markUserAsEdited(user) {
            this.editedUsers.add(user.email);
        },
        saveManagerChanges() {
            alert("Saving manager changes");
        },
        saveAdminChanges() {
            alert("Saving admin changes");
        },
        addEvent() {
            if (!this.manager.newEvent.title || !this.manager.newEvent.description || !this.manager.newEvent.date || !this.manager.newEvent.location) {
                alert('All fields are required');
                return;
            }
            fetch('/managers/add-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.manager.newEvent)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        fetchEvents() {
            fetch('/managers/events')
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    } else {
                        this.manager.events = data.events;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        fetchEventDetails() {
            if (!this.manager.modifyEvent.id) {
                alert('Event ID is required');
                return;
            }
            fetch(`/managers/get-event/${this.manager.modifyEvent.id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    } else {
                        this.manager.modifyEvent.title = data.title;
                        this.manager.modifyEvent.description = data.description;
                        this.manager.modifyEvent.date = this.formatDate(data.date);
                        this.manager.modifyEvent.location = data.location;
                        this.manager.modifyEvent.visibility = data.accessibility_status;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        modifyEvent() {
            fetch('/managers/modify-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.manager.modifyEvent)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        viewMembers() {
            alert("Viewing branch members");
        },
        viewRSVPs() {
            alert("Viewing event RSVPs");
        },
        addBranch() {
            if (!this.admin.addBranch.name || !this.admin.addBranch.phoneNumber || !this.admin.addBranch.email || !this.admin.addBranch.address.street || !this.admin.addBranch.address.streetNumber || !this.admin.addBranch.address.city || !this.admin.addBranch.address.state || !this.admin.addBranch.address.postalCode) {
                alert('All fields are required');
                return;
            }
            fetch('/admins/add-branch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.admin.addBranch)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        deleteBranch() {
            if (!this.admin.deleteBranch.id) {
                alert('Branch ID is required');
                return;
            }
            fetch('/admins/delete-branch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: this.admin.deleteBranch.id })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        setBranchManager() {
            if (!this.admin.setManager.branchId || !this.admin.setManager.email) {
                alert('Both Branch ID and Manager Email are required');
                return;
            }
            fetch('/admins/set-branch-manager', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.admin.setManager)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        fetchBranches() {
            fetch('/admins/branches')
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
        fetchUsers() {
            fetch('/admins/users')
                .then(response => response.json())
                .then(data => {
                    this.admin.users = data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        sortUsers(key) {
            this.admin.sortKey = key;
            this.admin.sortOrders[key] = this.admin.sortOrders[key] * -1;
        },
        searchUsers() { },
        async checkLoginStatus() {
            try {
                const response = await fetch("/users/login-status");
                const data = await response.json();
                if (!data.loggedIn) {
                    alert("You are not logged in");
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getUserType() {
            try {
                const response = await fetch("/users/user-type");
                const data = await response.json();
                this.userType = data.userType;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchUserInfo() {
            try {
                const response = await fetch("/users/user-info");
                const userInfo = await response.json();
                this.user.email = userInfo.email || '';
                this.user.firstName = userInfo.firstName || '';
                this.user.lastName = userInfo.lastName || '';
                this.user.phoneNumber = userInfo.phoneNumber || '';
                this.user.address.street = userInfo.street || '';
                this.user.address.streetNumber = userInfo.streetNumber || '';
                this.user.address.city = userInfo.city || '';
                this.user.address.state = userInfo.state || '';
                this.user.address.postalCode = userInfo.postalCode || '';
            } catch (error) {
                console.error(error);
            }
        }
    },
    watch: {
        'admin.searchQuery': 'searchUsers'
    },
    created() {
        this.fetchUsers();
    }
});
