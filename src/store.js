import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  mensagem: '',
  emailLogin: ''

};

const mutations = {
  setMensagem(state, mensagem) {
    state.mensagem = mensagem
  },
  setEmailLogin(state, email) {
    state.emailLogin = email
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters:  {
    getMensagem: state => state.mensagem,
    getEmailLogin: state => state.emailLogin
  }
})
