// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = true

let app;
const config = {
  apiKey: 'AIzaSyBxEGg-3cWbnbiKiG4hvq3dqR5B9xmOlUs',
  authDomain: 'pass-manager-2018.firebaseapp.com',
  databaseURL: 'https://pass-manager-2018.firebaseio.com/',
  projectId: 'pass-manager-2018',
  storageBucket: 'pass-manager-2018.appspot.com',
  messagingSenderId: '970687735077'
}

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
})

