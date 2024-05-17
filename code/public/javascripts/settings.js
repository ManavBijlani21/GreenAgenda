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
                location: ''
            },
            modifyEvent: {
                id: '',
                title: '',
                description: '',
                date: '',
                location: ''
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
            }
        }
    },
    methods: {
        toggleSection(section) {
            this.currentSection = section;
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
        }
    }
});
