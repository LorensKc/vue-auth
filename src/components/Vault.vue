<template>
  <div class="vault">
    <h1>{{ message }}</h1>
    <label v-if="open">Add new password
      <input type="text" v-model="newPassword">
      <input type="button" value="Save" @click="saveItem">
    </label>
    <label v-else>Edit password
      <input type="text" v-model="editableItem.text">
      <input type="button" value="Update" @click="updateItem">
      <input type="button" value="Cancel" @click="cancelEdit">
    </label>
    <table border="1">
      <tr>
        <th>Password</th>
        <th>Actions</th>
        <!-- <td><input type="password" v-model="password"></td> -->
      </tr>
      <tr v-for="(password, i) in passwords" :key="password.id">
        <td>
          <button @click="password.visible = !password.visible">Toggle</button>
          <span v-if="password.visible">{{password.text}}</span>
          <span v-else>***</span>
        </td>
        <td>
          <button @click="editItem(password, i)">Edit</button>
          <button @click="deleteItem(password, i)">Delete</button>
        </td>
      </tr>
    </table>

    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'

export default {
  name: 'vault',
  data () {
    return {
      message: 'Welcome to Password Manager',
      passwords: [],
      newPassword: '',
      editableItem: '',
      editableItemIndex: -1,
      open: true,
      showItem: false,
      db: null
    }
  },
  
  mounted () {
    this.db = firebase.database()
    this.loadItems()
  },
  computed: {
    currentUser () {
      var auth = firebase.auth()
      return auth.currentUser.uid
      // return
    },
    passwordRef () {
      return this.db.ref('passwords/user-' + this.currentUser)
    }
  },
  methods: {
    loadItems() {
     this.passwordRef.once('value').then(response => {
       const result = response.val()
       this.passwords = Object.keys(result).map(id => {
          return {
            ...result[id],
            id
          }
       })
      }).catch(console.warn)
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    cancelEdit() {
      this.editableItem = null
      this.editableItemIndex = -1
    },
    saveItem() {
      this.passwordRef.push({
        text: this.newPassword,
        visible: false
      }).then(response => {
        this.loadItems()
      }).catch(console.warn)
      this.newPassword = ''
    },
    editItem(password, i) {
      this.open = false;
      this.editableItem = password;
      this.editableItemIndex = i;
    },
    updateItem() {
      
      this.passwords[this.editableItemIndex] = this.editableItem
      // firestore updates
      var updates = {};
      updates[this.editableItem.id] = {
        text: this.editableItem.text,
        visible: false
      };
      this.passwordRef.update(updates);

      this.open = true;
      this.newPassword = '';

    },
    deleteItem(password, i) {
      const index = this.passwords.findIndex(p => p.text === password.text)
      if (index === -1) { // Не делать ничего если элемент не найден(уже удален)
        return
      }
      const answer = confirm('Delete?')
      if (answer) {
        // firestore delete
         this.db.ref('passwords/user-' + this.currentUser + '/' + password.id).remove()
        this.passwords.splice(index, 1)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
.vault {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  margin: 0 auto;
}
input {
  width: 70%;
}
button {
  margin: 20px auto 0;
  width: 40%;
  padding: 10px 20px;
  background: #42b983;
  color: #ffffff;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: none;
  cursor: pointer;
}
</style>
