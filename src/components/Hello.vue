<template>
  <div class="container">
    <div class="row">
      <h1>{{ msg }}</h1>
      <h2>Essential Links</h2>
      <h3>{{emailLogado}}</h3>
      <button type="button" @click="logout" class="btn btn-primary">Logout</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import store from '.././store'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    emailLogado() {
      return store.getters.getEmailLogin
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        store.commit('setMensagem', '')
        this.$router.replace('login')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
