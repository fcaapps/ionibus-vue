import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  mensagem: '',
  emailLogin: '',
  // config: '',
  // firebaseApp: '',
  // dbFB:''

};

const mutations = {
  setMensagem(state, mensagem) {
    state.mensagem = mensagem
  },
  setEmailLogin(state, email) {
    state.emailLogin = email
  },
  // setConfig(state, config) {
  //   state.config = config
  // },
  // setFirebaseApp(state, firebaseapp) {
  //   state.firebaseApp = firebaseapp
  // },
  // setDbFB(state, db) {
  //   state.dbFB = db
  // }
};

export default new Vuex.Store({
  state,
  mutations,
  getters:  {
    getMensagem: state => state.mensagem,
    getEmailLogin: state => state.emailLogin,
    // getConfig: state => state.config,
    // getFirebaseApp: state => state.firebaseApp,
    // getDbFB: state => state.dbFB
  }
})
