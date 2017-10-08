<template>
  <div id="cadastro_capitaes">
    <v-card>
      <!-- Formulário de Cadastro com Validador -->
      <v-form v-model="valid" ref="form">
      <v-container grid-list-md>
        <v-layout row wrap style="margin-left: 30px; margin-right: 30px;">
            <!-- Nome do Capitão -->
            <v-flex xs12 sm3>
              <v-text-field
                label="Nome"
                v-model="nome"
                :rules="[(v) => !!v || 'Nome é obrigatório']"
                required
              ></v-text-field>
            </v-flex>
            <!-- Congregacao -->
            <v-flex xs12 sm4>
              <!-- <b-form-select v-model="congrega" :options="lista_congregacao" class="mb-3">
              </b-form-select> -->
                <v-select
                @click.once="getCongregacao"
                @keyup.alt.40="getCongregacao"
                @keyup.down="getCongregacao"
                box
                label="Congregacão"
                v-bind:items="lista_congregacao"
                v-model="congrega"
                item-value="text"
                required
                :rules="[(v) => !!v || 'Congregação é obrigatório']"
              ></v-select>
            </v-flex>
            <!-- Responsavel -->
            <v-flex xs12 sm4>
                <v-select
                @click.once="getResponsavel"
                @keyup.alt.40="getResponsavel"
                @keyup.down="getResponsavel"
                box
                label="Responsavel"
                v-bind:items="lista_responsavel"
                v-model="responsa"
                item-value="text"
                required
                :rules="[(v) => !!v || 'Responsável é obrigatório']"
              ></v-select>
            </v-flex>
            <!-- Telfone 1 -->
            <v-flex xs12 sm4>
              <v-text-field
                label="Telefone 1"
                v-model="tel_1"
                required
                :rules="[(v) => !!v || 'Telefone 1 é obrigatório']"
              ></v-text-field>
            </v-flex>
            <!-- Telfone 2 -->
            <v-flex xs12 sm4>
              <v-text-field
                label="Telefone 2"
                v-model="tel_2"
                required
                :rules="[(v) => !!v || 'Telefone 2 é obrigatório']"
              ></v-text-field>
            </v-flex>
          <v-flex xs12 sm2>
            <br>
            <!-- Butão de Cadastro do Responsável -->
            <v-btn
                  style="width: 150px;"
                  class="teal darken-1"
                  primary
                  @click="cadastraCapitaes"
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
                  @click="limparFieldsCapitaes"
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
import { Responsaveis } from '.././firebase';
import { Congregacao } from '.././firebase';
import { Capitaes } from '.././firebase';

export default {
  name: "cadastro_capitaes",
  data () {
    return {
      nome: '',
      valid: false,
      congrega: '',
      responsa: '',
      tel_1: '',
      tel_2: '',
      carregadoCong: false,
      carregadoResp: false,
      menu: false,
      lista_congregacao: [],
      lista_responsavel: []
    }
  },
  firebase: {
    congregacao : Congregacao,
    responsaveis : Responsaveis
  },
  methods: {
      //Função de Cadastro
      cadastraCapitaes() {
        if (this.$refs.form.validate()) {
            Capitaes.push({
              nome: this.nome,
              congregacao: this.congrega,
              responsavel: this.responsa,
              tel_1: this.tel_1,
              tel_2: this.tel_2
            });
        }
      },
      //Alimenta Combobox Congregacao
      getCongregacao() {
        if (this.carregadoCong == false) {
          for (var i = 0; i < this.congregacao.length; i++) {
            this.lista_congregacao.push({ text: this.congregacao[i].nome });
          }
          this.carregadoCong = true;
        };
      },
      //Alimenta Combobox Responsavel
      getResponsavel() {
        if (this.carregadoResp == false) {
          for (var i = 0; i < this.responsaveis.length; i++) {
            this.lista_responsavel.push({ text: this.responsaveis[i].nome });
          }
          this.carregadoResp = true;
        };
      },
      //Limpa Campos
      limparFieldsCapitaes() {
        this.nome = ''
        this.congrega = ''
        this.responsa = ''
        this.tel_1 = ''
        this.tel_2 = ''
      }
    }
}
</script>
