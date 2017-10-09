import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login';
import SignUp from '@/components/SignUp'
import Principal from '@/components/Principal'
import Eventos from '@/components/Eventos'
import Congregacao from '@/components/Congregacao'
import Responsaveis from '@/components/Responsaveis'
import Capitaes from '@/components/Capitaes'
import Passageiros from '@/components/Passageiros'
import firebase from 'firebase'


Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
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
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/principal/:slug',
    //   meta: {
    //       requiresAuth: true
    //   },
    //   children: [
    //     {
    //       path: '',
    //       name: 'Principal',
    //       component: require('./Principal')
    //     }
    //   ]
    // }
    {
      path: '/principal',
      name: 'Principal',
      component: Principal,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/eventos',
          name: 'Eventos',
          component: Eventos,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/congregacao',
          name: 'Congregacao',
          component: Congregacao,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/responsaveis',
          name: 'Responsaveis',
          component: Responsaveis,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/capitaes',
          name: 'Capitaes',
          component: Capitaes,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/passageiros',
          name: 'Passageiros',
          component: Passageiros,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('principal')
  else next()
})

export default router
