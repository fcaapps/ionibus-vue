<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex style="margin-top: 100px;" xs12 md4 offset-md4>
        <v-card>
          <v-toolbar class="blue-grey darken-2" dark>
            <v-toolbar-title style="color: white;">
            <label>iOnibus - Login</label>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              autofocus
              label="E-mail"
              type="text"
              hint="Digite seu e-mail"
              v-model="email"
              :rules="[() => first.length > 0 || 'E-mail é obrigatório']"
              required
            ></v-text-field>
            <v-text-field
              label="Senha"
              type="password"
              hint="Digite sua senha"
              v-model="password"
              @keyup.enter.native="loader = 'loading4'"
              :rules="[() => first.length > 0 || 'Senha é obrigatório']"
              required
            ></v-text-field>
            <v-btn
              class="blue-grey darken-2"
              info
              block
              :loading="loading4"
              @click.native="loader = 'loading4'"
              :disabled="loading4"
            >
              Entrar no sistema
            </v-btn>
            <p style="font-size: 12px; font-weight: bold; margin-left: 5px;">Não é cadastrado ? Cadastre-se <strong><router-link to="/signup">AQUI</router-link>.</strong></p>
            <!-- <label style="color: red; font-size: 13px;">{{msgErroLogin}}</label> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from 'firebase'
import store from '.././store'


export default {
  name: "login",
  data: function() {
    return {
      email:'',
      password: '',
      first: '',
      middle: '',
      last: '',
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null

        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('Principal')
            store.commit('setEmailLogin', this.email)
          },
          (err) => {
            store.commit('setMensagem', '* - Usuário ou senha inválidos !')
          }
        );

      }
    },
  computed: {
    msgErroLogin() {
      return store.getters.getMensagem;
    }
  },
  methods: {
    signIn: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('Principal')
          store.commit('setEmailLogin', this.email)
        },
        (err) => {
          store.commit('setMensagem', '* - Usuário ou senha inválidos !')
        }
      );
    },
    zerarMsgErro: function() {
      store.commit('setMensagem', '');
    }
  }
}
</script>
<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
