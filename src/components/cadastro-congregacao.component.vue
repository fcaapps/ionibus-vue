<template>
  <div id="cadastro_congregacao">
    <v-card>
      <!-- Toolbar no topo da página -->
      <!-- <v-toolbar class="transparent" style="height: 40px;">
        <v-toolbar-title style="color: #1C1C1C; margin-left: 10px; margin-bottom: 20px;">Eventos</v-toolbar-title>
      </v-toolbar> -->
      <!-- Formulário de Cadastro com Validador -->
      <v-form v-model="valid" ref="form">
      <v-container grid-list-md>
        <v-layout row wrap style="margin-left: 30px; margin-right: 30px;">
            <!-- Nome da Congregacao -->
            <v-flex xs12 sm3>
              <v-text-field
                label="Nome"
                v-model="nome"
                :rules="[(v) => !!v || 'Nome é obrigatório']"
                required
              ></v-text-field>
            </v-flex>
            <!-- Endereço -->
            <v-flex xs12 sm5>
              <v-text-field
                label="Endereço"
                v-model="endereco"
                :rules="[(v) => !!v || 'Endereço é obrigatório']"
                required
              ></v-text-field>
            </v-flex>
            <!-- Coordenador -->
            <v-flex xs12 sm3>
              <v-text-field
                label="Coordenador"
                v-model="coordenador"
                required
                :rules="[(v) => !!v || 'Coordenador é obrigatório']"
              ></v-text-field>
            </v-flex>
            <!-- Telefone do Coordenador -->
            <v-flex xs12 sm2>
              <v-text-field
                label="Telefone Coord."
                v-model="tel_coordenador"
                :mask="mask"
                required
                :rules="[(v) => !!v || 'Telefone é obrigatório']"
              ></v-text-field>
            </v-flex>
            <!-- Email do Coordenador -->
            <v-flex xs12 sm3>
              <v-text-field
                label="Email do Coordenador"
                v-model="email_coordenador"
                required
                :rules="[(v) => !!v || 'Status do evento é obrigatório']"
              ></v-text-field>
            </v-flex>
            <!-- Circuito -->
            <v-flex xs12 sm3>
              <v-select
                box
                label="Circuito"
                v-bind:items="lista_circuito"
                v-model="circuito"
                item-value="text"
                required
                :rules="[(v) => !!v || 'Circuito é obrigatório']"
              ></v-select>
            </v-flex>
          <v-flex xs12 sm2>
            <br>
            <!-- Butão de Cadastro da Congregação -->
            <v-btn
                  style="width: 150px;"
                  class="teal darken-1"
                  primary
                  @click="cadastraCongregacao"
                >
                  <v-icon>save</v-icon>
                  <p style="margin: 5px;">Cadastrar</p>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm2>
            <br>
            <!-- Butão de Limpar Campos -->
            <v-btn
                  style="color: black; width: 150px;"
                  class="transparent"
                  primary
                  @click="limparFieldsCongregacao"
                >
                  <v-icon>clear_all</v-icon>
                  <p style="margin: 5px;">Limpar</p>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import { Congregacao } from '.././firebase';
import store from '.././store';
import MaskedInput from 'vue-text-mask'

export default {
  name: "cadastro_congregacao",
  components: {
    MaskedInput
  },
  data () {
    return {
      nome: '',
      endereco: '',
      circuito: '',
      valid: false,
      coordenador: '',
      tel_coordenador: '',
      email_coordenador: '',
      menu: false,
      lista_circuito: [
        { text: 'CE01 - CIRCUITO CE O1' },
        { text: 'CE02 - CIRCUITO CE O2' }
      ],
      mask: 'credit-card',
      value: '4444444444444444'
    }
  },
  methods: {
      //Função de Cadastro
      cadastraCongregacao() {
        if (this.$refs.form.validate()) {
            Congregacao.push({
              nome: this.nome,
              endereco: this.endereco,
              coordenador: this.coordenador,
              tel_coordenador: this.tel_coordenador,
              email_coordenador: this.email_coordenador,
              circuito: this.circuito
            });
        }
      },
      limparFieldsCongregacao() {
        this.nome = ''
        this.endereco = ''
        this.coordenador = ''
        this.tel_coordenador = ''
        this.email_coordenador = ''
        this.circuito = ''
      }
    }
}
</script>
