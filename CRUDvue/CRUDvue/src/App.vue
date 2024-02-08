<script>
export default {
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
      axios.put(`http://localhost:3000/users/${this.selectedUser.id}`, { name:
        this.updatedUserName })
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
  }
}
</script>

<template>
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
    <button @click="addUser()">Agregar Usuario</button>
    <h2 v-if="selectedUser">Actualizar Usuario</h2>
    <div v-if="selectedUser">
      <input v-model="updatedUserName" placeholder="Nuevo Nombre del Usuario">
      <button @click="saveUpdatedUser()">Guardar Cambios</button>
    </div>
  </div>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
