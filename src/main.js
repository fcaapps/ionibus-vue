// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.use(Vuetify)
Vue.config.productionTip = false

let app;
var config = {
    apiKey: "AIzaSyCCmpW0a5ahFZ5h1F3pWXz_lWpixXGJAPM",
    authDomain: "vue-firebase-tutorial-ccbce.firebaseapp.com",
    databaseURL: "https://vue-firebase-tutorial-ccbce.firebaseio.com",
    projectId: "vue-firebase-tutorial-ccbce",
    storageBucket: "",
    messagingSenderId: "310623566606"
  };

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App }
    })
  }
});
