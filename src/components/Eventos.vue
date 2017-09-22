<template>
  <div>
    <v-card class="transparent">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <div> >> Eventos</div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field box label="First Name" v-model="first"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field box label="Last Name" v-model="last"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              box
              label="Email address"
              :rules="emailRules"
              v-model="email"
              hint="Enter your email!"
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field box multi-line label="Bio"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import store from '.././store'

export default {
  name: 'eventos',
  data () {
    return {
      first: 'John',
      last: 'Doe',
      email: '',
      emailRules: [
        v => {
          return !!v || 'E-mail is required'
        },
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
