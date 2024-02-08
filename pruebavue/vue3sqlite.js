vue3sqlite.js
const app = Vue.createApp({
    data() {
        return {
            users: [],
            newUser: {
                name: ''
            },
            selectedUser: null,
            updatedUserName: ''
        };
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            axios.get('http://localhost:3000/users')
                .then(response => this.users = response.data)
                .catch(error => console.error('Error al obtener usuarios:', error));
        },
        addUser() {
            axios.post('http://localhost:3000/users', { name: this.newUser.name })
                .then(() => {
                    this.getUsers();
                    this.newUser.name = ''; // Limpiar el campo después de agregar un usuario
                })
                .catch(error => console.error('Error al agregar usuario:', error));
        },
        updateUser(user) {
            this.selectedUser = user;
            this.updatedUserName = user.name;
        },
        saveUpdatedUser() {
            axios.put(`http://localhost:3000/users/${this.selectedUser.id}`, { name: this.updatedUserName })
                .then(() => {
                    this.getUsers();
                    this.selectedUser = null;
                })
                .catch(error => console.error('Error al actualizar usuario:', error));
        },
        deleteUser(userId) {
            axios.delete(`http://localhost:3000/users/${userId}`)
                .then(() => this.getUsers())
                .catch(error => console.error('Error al eliminar usuario:', error));
        }
    },
    template: `
<div>
<h2>Lista de Usuarios</h2>
<ul>
<li v-for="user in users" :key="user.id">
{{ user.name }} (ID: {{ user.id }})
<button @click="updateUser(user)">Editar</button>
<button @click="deleteUser(user.id)">Eliminar</button>
</li>
</ul>
<h2>Agregar Nuevo Usuario</h2>
<input v-model="newUser.name" placeholder="Nombre del Usuario">
<button @click="addUser">Agregar Usuario</button>
<h2 v-if="selectedUser">Actualizar Usuario</h2>
<div v-if="selectedUser">
<input v-model="updatedUserName" placeholder="Nuevo Nombre del Usuario">
<button @click="saveUpdatedUser">Guardar Cambios</button>
</div>
</div>
`
});
app.mount('#app');