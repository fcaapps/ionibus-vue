// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import './firebase'
import VueFire from 'vuefire'
import store from './store'
import firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(BootstrapVue);
Vue.use(VueFire);
Vue.use(Vuetify);
Vue.config.productionTip = false

// Vue.filter 'phone', (value) ->
//     return value.replace(/^([0-9]{3})([0-9]{3})([0-9]{4})$/, '($1)-$2-$3')

let app;
// var config = {
//     apiKey: "AIzaSyCNAHsRp8yS2FDUWlkZIAWmyRt3WHzGy88",
//     authDomain: "ionibus-ac0ed.firebaseapp.com",
//     databaseURL: "https://ionibus-ac0ed.firebaseio.com",
//     projectId: "ionibus-ac0ed",
//     storageBucket: "ionibus-ac0ed.appspot.com",
//     messagingSenderId: "579691884183"
//   };
// store.commit('setConfig', {
//   apiKey: "AIzaSyCNAHsRp8yS2FDUWlkZIAWmyRt3WHzGy88",
//   authDomain: "ionibus-ac0ed.firebaseapp.com",
//   databaseURL: "https://ionibus-ac0ed.firebaseio.com",
//   projectId: "ionibus-ac0ed",
//   storageBucket: "ionibus-ac0ed.appspot.com",
//   messagingSenderId: "579691884183"
// });

// var firebaseapp = firebase.initializeApp(store.getters.getConfig);
// store.commit('setFirebaseApp',firebaseapp);
//
// var db = firebaseapp.database();
// store.commit('setDbFB',db);


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
