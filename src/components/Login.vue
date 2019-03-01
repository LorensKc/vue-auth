<template>
    <div class="login">
        <h3>Sign In</h3>
        <form action="">
          <input class="text-field" type="text" v-model="email" placeholder="Email"><br />
          <input class="text-field" type="password" v-model="password" placeholder="Password"><br />
          <button class="save-button" v-on:click="signIn">Connection</button>
        </form>
        <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase'

import MenuIcon from "vue-material-design-icons/Menu.vue"

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    MenuIcon
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('vault')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

h3 {
  font-size: 24px;
}

form {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 60%;
  margin: 0 auto;
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

p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
