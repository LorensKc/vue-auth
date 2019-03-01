<template>
  <div class="vault">
    <h1>{{ message }}</h1>
    <label v-if="open">
      <span>Add new password</span>
      <input class="text-field" type="text" v-model="newPassword">
      <input class="save-button" type="button" value="Save" @click="saveItem">
    </label>
    <label v-else>
      <span>Edit password</span>
      <input class="text-field" type="text" v-model="editableItem.text">
      <div class="btn-wrap">
        <input class="save-button" type="button" value="Update" @click="updateItem">
        <input class="save-button" type="button" value="Cancel" @click="cancelEdit">
      </div>
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

    <button class="logout" v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'
import MenuIcon from "vue-material-design-icons/Menu.vue"

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
  components: {
    MenuIcon
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
      updates[this.editableItem.uid] = {
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
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
  width: 100%;
}
.vault {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;
}
input {
  width: 70%;
}
button {
  // margin: 20px auto 0;
  width: 45%;
  padding: 7px 0;
  border: 1px solid black;
  background: none;
  border-radius: 25px;
  color: #000000;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  transition: all ease .4s;
  font-size: 18px;
  &:hover {
    background: black;
    color: white;
  }

  &.logout {
    padding: 15px 0;
    width: 30%;
    margin: 0 0 30px;
  }
}

label {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 0 0 15px;
  width: 100%;

  span {
    font-size: 24px;
    margin: 0 0 15px;
  }

  .btn-wrap {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-around;
  }

  .text-field {
    width: 40%;
    padding: 15px 10px;
    margin: 0 0 15px;
    border: none;
    border-bottom: 1px solid black;
    background: lightgray;
    outline: none;
    transition: ease all .4s;
    font-size: 18px;

    &:focus {
      background: gray;
      color: #ffffff;
    }
  }
}
.save-button {
  display: flex;
  justify-content: center;
  width: 30%;
  padding: 7px 0;
  border: 1px solid black;
  background: none;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  font-size: 24px;
  transition: all ease .4s;
  
  &:hover {
    background: black;
    color: white;
  }
}

table {
  width: 100%;
  margin: 0 0 20px;
  border: none;
  tr {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    padding: 20px 0;
    border: 1px solid black;

    td, th {
      width: 50%;
      border: none;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 0 50px;
    }
    th {
      justify-content: center;
      font-size: 24px;
    }
  }
}
</style>
