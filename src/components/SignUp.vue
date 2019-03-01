<template>
    <div class="sign-up">
        <h3>Let's create a new account !</h3>
        <form action="">
          <input class="text-field" type="text" v-model="email" placeholder="Email"><br />
          <input class="text-field" type="password" v-model="password" placeholder="Password"><br />
          <button class="save-button" v-on:click="signUp">Sign Up</button>
        </form>
        <span>or back to <router-link to="/login">login</router-link></span>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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
.signUp {
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

span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
