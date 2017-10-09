<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex style="margin-top: 100px;" xs12 md4 offset-md4>
        <v-card>
          <v-toolbar class="teal" dark>
            <v-toolbar-title style="color: white;">
            <label>Cadastro de Usuário</label>
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
              class="teal"
              info
              block=true
              :loading="loading4"
              @click.native="loader = 'loading4'"
              :disabled="loading4"
            >
              Cadastrar
            </v-btn>
            <p style="font-size: 12px; margin-left: 5px;">ou voltar para <strong><router-link to="/login">LOGIN</router-link>.</strong></p>
            <!-- <label style="color: red; font-size: 13px;">{{msgErroLogin}}</label> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <div class="container">
      <div class="row">
  		<div class="col-md-4 col-md-offset-4">
              <p style="font-size: 25px; font-weight: bold; color: SeaGreen; margin: 20px;">Cadastro</p>
              <hr>
  			    	<form>
          			    	  	<div class="form-group">
          			    		    <input class="form-control" v-model="email" placeholder="E-mail" type="text">
          			    		</div>
          			    		<div class="form-group">
          			    			<input class="form-control" v-model="password" placeholder="Senha" type="password" @keyup.enter="signIn">
          			    		</div>

          			    		<button @click="signUp" class="btn btn-lg btn-success btn-block">Entrar no Sistema</button>
                        <p style="margin-top: 15px"><span>ou voltar para <strong><router-link to="/login">login</router-link>.</strong></span></p>
  			      	</form>
  		</div>
  	</div>
  </div> -->
</template>
<script>
import firebase from 'firebase'
export default {
  name: "signUp",
  data: function(){
    return {
      email: '',
      password: '',
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false
    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('Principal')
          },
          (err) => {
            alert('Oops. '+ err.message)
          }
        );

      }
    },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('Principal')
        },
        (err) => {
          alert('Oops. '+ err.message)
        }
      );
    }
  }
}
</script>
<style scoped>
  body{
    padding-top:20px;
  }
  input {
    height: 50px;
    font-size: 20px;
  }
  button {
    height: 50px;
    background-color: SeaGreen;
  }
</style>
