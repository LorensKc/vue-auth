<template>
  <div class="vault">
    <h1>{{ msg }}</h1>
    <table border="1">
      <tr>
        <th>Your Email</th>
        <td><input type="email" v-model="email"></td>
      </tr>
      <tr>
        <th>Your Password</th>
        <td><input type="password" v-model="password"></td>
      </tr>
    </table>

    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'vault',
  data () {
    return {
      msg: 'Welcome to Password Manager',
      email: '',
      password: ''
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
    // saveEmail () {
    //   firebase.auth().onAuthStateChanged((user) => {
    //     this.$root.email = user.email
    //   })
    // }
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
