const vueApp = new Vue({
    el: '#app',
    data: {
        currentSection: 'user',
        user: {
            email: '',
            password: '',
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
        }
    },
    methods: {
        toggleSection(section) {
            this.currentSection = section;
        },
        saveUserChanges() {
            alert("Saving user changes");
        },
        saveManagerChanges() {
            alert("Saving manager changes");
        },
        saveAdminChanges() {
            alert("Saving admin changes");
        },
        addEvent() {
            alert(`Adding event: ${this.manager.newEvent.title}`);
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
