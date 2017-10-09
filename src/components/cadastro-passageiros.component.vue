<template>
  <div id="cadastro_passageiros">
    <v-card>
      <!-- Formulário de Cadastro com Validador -->
      <v-form v-model="valid" ref="form">
      <v-container grid-list-md>
        <v-layout row wrap style="margin-left: 30px; margin-right: 30px;">
            <!-- Nome do Passageiro -->
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
            <!-- Capitão -->
            <v-flex xs12 sm4>
                <v-select
                @click.once="getCapitao"
                @keyup.alt.40="getCapitao"
                @keyup.down="getCapitao"
                box
                label="Capitão"
                v-bind:items="lista_capitao"
                v-model="capita"
                item-value="text"
                required
                :rules="[(v) => !!v || 'Capitão é obrigatório']"
              ></v-select>
            </v-flex>
            <!-- RG/CPF -->
            <v-flex xs12 sm4>
              <v-text-field
                label="RG/CPF"
                v-model="rg_cpf"
                required
                :rules="[(v) => !!v || 'RG/CPF 1 é obrigatório']"
              ></v-text-field>
            </v-flex>
            <!-- Criança de Colo -->
            <v-flex xs12 sm4>
                <v-select
                  box
                  label="Criança de Colo"
                  v-bind:items="lista_crianca_colo"
                  v-model="crianca_colo"
                  item-value="text"
                  required
                  :rules="[(v) => !!v || 'Criança de Colo é obrigatório']"
              ></v-select>
            </v-flex>
          <v-flex xs12 sm2>
            <br>
            <!-- Butão de Cadastro do Passageiro -->
            <v-btn
                  style="width: 150px;"
                  class="teal darken-1"
                  primary
                  @click="cadastraPassageiros"
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
                  @click="limparFieldsPassageiros"
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
import { Capitaes } from '.././firebase';
import { Passageiros } from '.././firebase';


export default {
  name: "cadastro_capitaes",
  data () {
    return {
      nome: '',
      valid: false,
      congrega: '',
      rg_cpf: '',
      capita: '',
      crianca_colo: '',
      lista_crianca_colo: [
        { text: 'Sim' },
        { text: 'Não' }
      ],
      carregadoCong: false,
      carregadoCapi: false,
      menu: false,
      lista_congregacao: [],
      lista_capitao: []
    }
  },
  firebase: {
    congregacao : Congregacao,
    capitao : Capitaes
  },
  methods: {
      //Função de Cadastro
      cadastraPassageiros() {
        if (this.$refs.form.validate()) {
            Passageiros.push({
              nome: this.nome,
              congregacao: this.congrega,
              capitao: this.capita,
              rg_cpf: this.rg_cpf,
              crianca_colo: this.crianca_colo
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
      //Alimenta Combobox Capitaes
      getCapitao() {
        if (this.carregadoCapi == false) {
          for (var i = 0; i < this.capitao.length; i++) {
            this.lista_capitao.push({ text: this.capitao[i].nome });
          }
          this.carregadoCapi = true;
        };
      },
      //Limpa Campos
      limparFieldsPassageiros() {
        this.nome = ''
        this.congrega = ''
        this.capitao = ''
        this.rg_cpf = ''
        this.crianca_colo = ''
      }
    }
}
</script>
