import Vue from 'vue';
import Vuex from 'vuex';
import { Congregacao } from './firebase';

Vue.use(Vuex);

var congregacao_i = [];

const state = {
  mensagem: '',
  emailLogin: '',
  tpEvento: '',
  dtEvento: '',
  circuito: '',
  textoBase: '',
  localEvento: '',
  statusEvento: '',
  keyEvento: '',
  listaCongregacao: []
};

const mutations = {
  setMensagem(state, mensagem) {
    state.mensagem = mensagem
  },
  setEmailLogin(state, email) {
    state.emailLogin = email
  },
  setTpEvento(state, tp_evento) {
    state.tpEvento = tp_evento
  },
  setDtEvento(state, dt_evento) {
    state.dtEvento = dt_evento
  },
  setCircuito(state, circuito) {
    state.circuito = circuito
  },
  setTextoBase(state, texto_base) {
    state.textoBase = texto_base
  },
  setLocalEvento(state, local_evento) {
    state.localEvento = local_evento
  },
  setStatusEvento(state, status_evento) {
    state.statusEvento = status_evento
  },
  setKeyEvento(state, key_evento) {
    state.keyEvento = key_evento
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters:  {
    getMensagem: state => state.mensagem,
    getEmailLogin: state => state.emailLogin,
    getTpEvento: state => state.tpEvento,
    getDtEvento: state => state.dtEvento,
    getCircuito: state => state.circuito,
    getTextoBase: state => state.textoBase,
    getLocalEvento: state => state.localEvento,
    getStatusEvento: state => state.statusEvento,
    getKeyEvento: state => state.keyEvento,
    getListaCongregacao: state => {
      this.$bindAsArray('congregacao_i', Congregacao);
      for (var i = 0; i < this.congregacao_i.length; i++) {
        state.listaCongregacao.push({ text: this.congregacao_i[i].nome });
      };
      return state.listaCongregacao
    }
  }
})
