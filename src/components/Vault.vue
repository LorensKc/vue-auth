<template>
  <div class="vault">
    <h1>{{ message }}</h1>
    <label v-if="!editableItem">Add new password
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
      <tr v-for="password in passwords" :key="password">
        <td>
          <button @click="toggleItem(password)">Toggle</button>
          <span v-if="password.visible">{{password.text}}</span>
          <span v-else>********</span>
        </td>
        <td>
          <button @click="editItem(password)">Edit</button>
          <button @click="deleteItem(password)">Delete</button>
        </td>
      </tr>
    </table>

    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
require('firebase/firestore')

export default {
  name: 'vault',
  data () {
    return {
      message: 'Welcome to Password Manager',
      passwords: [],
      newPassword: '',
      editableItem: null,
      editableItemIndex: -1
    }
  },
  
  mounted () {
    const db = firebase.firestore()
    const dbPasswords = db.collection('passwords')

    // const settings = {/* your settings... */ timestampsInSnapshots: false}
    // db.settings(settings) //говорит что надо убрать это

    // dbPasswords.doc('password').get().then(response => {
    //   console.info('DB respnse', response)
    //   this.passwords = response
    // }).catch(console.warn)
    
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    cancelEdit() {
      this.editableItem = null
      this.editableItemIndex = -1
    },
    saveItem() {
      dbPasswords.doc('password').set({
        text: this.newPassword,
        visible: false
      }).then(response => {
        console.info('DB response', response)
        this.passwords.push({
          text: this.newPassword,
          // id: response.id, //
          visible: false
        })
      }).catch(console.warn)
      this.newPassword = ''
      console.log('')
    },
    toggleItem(password) {
      password.visible = !password.visible
    },
    editItem(password) {
      this.editableItem = password
      this.editableItemIndex = this.passwords.findIndex(p => p.text === password.text)
    },
    updateItem() {
      this.passwords[this.editableItemIndex] = this.editableItem
      // firestore updates
      this.cancelEdit()
    },
    deleteItem(password) {
      const index = this.passwords.findIndex(p => p.text === password.text)
      if (index === -1) { // Не делать ничего если элемент не найден(уже удален)
        return
      }
      const answer = confirm('Delete?')
      if (answer) {
        // firestore delete
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
