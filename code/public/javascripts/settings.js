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
            }
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
            filteredUsers: [],
            sortKey: '',
            sortOrders: {
                firstName: 1,
                lastName: 1,
                email: 1,
                phoneNumber: 1,
                userType: 1
            }
        },
        loggedIn: false,
        userType: 'user',
    },
    mounted() {
        this.checkLoginStatus();
        this.getUserType();
        this.fetchUserInfo();
    },
    methods: {
        toggleSection(section) {
            if (section == 'user' || (section == 'manager' && this.userType == 'manager') || (section == 'admin' && this.userType == 'admin')) {
                this.currentSection = section;
            }
        },
        saveUserChanges() {
            fetch('/users/update-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.user)
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
        modifyEvent() {
            alert(`Modifying event ID: ${this.manager.modifyEvent.id}`);
        },
        viewMembers() {
            alert("Viewing branch members");
        },
        viewRSVPs() {
            alert("Viewing event RSVPs");
        },
        addBranch() {
            alert(`Adding branch: ${this.admin.addBranch.name}`);
        },
        deleteBranch() {
            alert(`Deleting branch ID: ${this.admin.deleteBranch.id}`);
        },
        setBranchManager() {
            alert(`Setting manager for branch ID: ${this.admin.setManager.branchId}`);
        },
        searchUsers() {
            this.filteredUsers = this.admin.users.filter(user => {
                return user.firstName.toLowerCase().includes(this.admin.searchQuery.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(this.admin.searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(this.admin.searchQuery.toLowerCase()) ||
                    user.phoneNumber.toLowerCase().includes(this.admin.searchQuery.toLowerCase()) ||
                    user.userType.toLowerCase().includes(this.admin.searchQuery.toLowerCase());
            });
        },
        sortUsers(key) {
            this.admin.sortKey = key;
            this.admin.sortOrders[key] = this.admin.sortOrders[key] * -1;
            this.filteredUsers.sort((a, b) => {
                let result = 0;
                if (typeof a[key] === 'string') {
                    result = a[key].localeCompare(b[key]);
                } else if (typeof a[key] === 'number') {
                    result = a[key] - b[key];
                }
                return result * this.admin.sortOrders[key];
            });
        },
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
        this.admin.users = [
            { firstName: 'John', lastName: 'Doe', email: 'jd@example.com', phoneNumber: '1234567890', userType: 'admin' },
            { firstName: 'Jack', lastName: 'R', email: 'JR@example.com', phoneNumber: '2345678901', userType: 'manager' },
            { firstName: 'u', lastName: 'ser', email: 'us@example.com', phoneNumber: '3456789012', userType: 'user' }
        ];
        this.filteredUsers = this.admin.users;
    }
});
