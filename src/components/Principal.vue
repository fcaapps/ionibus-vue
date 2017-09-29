<template>
  <div id="app">
  <v-app light>
    <v-navigation-drawer
      class="green lighten-4"
      absolute
      light
      persistent
      overflow
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
    >
      <v-list class="green lighten-4" dense>
        <v-divider></v-divider>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click=""
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="itemMenu(item.title)" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="teal">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-btn
        icon
        light
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        icon
        light
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn> -->
      <v-btn
        icon
        light
      >
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn
        icon
        light
      >
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-menu
              >
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-icon x-large light>person_pin</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title style="color: teal;">Usuário logado:</v-list-tile-title>
                  <v-list-tile-sub-title>{{emailLogado}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile @click="logout()">
                <v-list-tile-avatar>
                  <v-icon x-large light>exit_to_app</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title style="color: teal;">Logout</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
      </v-menu>
    </v-toolbar>
    <main>
      <v-container id="app" fluid>
        <router-view class="view"></router-view>
      </v-container>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'
import store from '.././store'

export default {
  name: 'principal',
  data () {
    return {
      drawer: true,
      items: [
        { icon: 'event', title: 'Eventos' },
        { icon: 'home', title: 'Congregações' },
        { icon: 'people', title: 'Responsáveis' },
        { icon: 'people_outline', title: 'Capitães' },
        { icon: 'nature_people', title: 'Passageiros' }
      ],
      mini: false,
      right: true,
      clipped: true,
      drawer: false,
      fixed: true,
      miniVariant: false,
      right: null,
      rightDrawer: false,
      title: 'Sistema Coordenado de Transportes',
      menuItem: ''

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
        this.$router.push('login')
      })
    },
    itemMenu: function(menuItem) {
      switch (menuItem) {
        case 'Eventos':
          this.$router.replace('eventos')
          break;
        case 'Congregações':
            this.$router.replace('eventos')
            break;
        default:

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h1, h2 {
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
}*/
</style>
