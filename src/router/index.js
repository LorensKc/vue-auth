import Vue from 'vue'
import Router from 'vue-router'

import Vault from '@/components/Vault'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import firebase from 'firebase'
import "vue-material-design-icons/styles.css"

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/vault',
      name: 'Vault',
      component: Vault,
      meta: {
        requireAuth: true
      }
    }
    // {
    //   path: '*',
    //   redirect: '/login'
    // }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requireAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requireAuth && !currentUser) next({name: 'Login'})
  // else if (!requireAuth && currentUser) next({name: 'Vault'})
  else next()
})

export default router
