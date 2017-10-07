<template>
  <div id="cadastro_responsaveis">
    <v-card>
      <!-- Toolbar no topo da página -->
      <!-- <v-toolbar class="transparent" style="height: 40px;">
        <v-toolbar-title style="color: #1C1C1C; margin-left: 10px; margin-bottom: 20px;">Eventos</v-toolbar-title>
      </v-toolbar> -->
      <!-- Formulário de Cadastro com Validador -->
      <v-form v-model="valid" ref="form">
      <v-container grid-list-md>
        <v-layout row wrap style="margin-left: 30px; margin-right: 30px;">
            <!-- Nome do Responsavel -->
            <v-flex xs12 sm3>
              <v-text-field
                label="Nome"
                v-model="nome"
                :rules="[(v) => !!v || 'Nome é obrigatório']"
                required
              ></v-text-field>
            </v-flex>
            <!-- Tipo do Responsavel -->
            <v-flex xs12 sm4>
                <v-select
                box
                label="Tipo"
                v-bind:items="lista_tipo_responsavel"
                v-model="tipo_responsavel"
                item-value="text"
                required
                :rules="[(v) => !!v || 'Tipo é obrigatório']"
              ></v-select>
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
            <!-- Email do Responsavel -->
            <v-flex xs12 sm4>
              <v-text-field
                label="E-mail do Responsável"
                v-model="email_responsavel"
                required
                :rules="[(v) => !!v || 'E-mail é obrigatório']"
              ></v-text-field>
            </v-flex>
            <!-- Telefone do Responsavel -->
            <v-flex xs12 sm4>
              <v-text-field
                label="Telefone Resp."
                v-model="tel_responsavel"
                :mask="'(99)99999-9999'"
                required
                :rules="[(v) => !!v || 'Telefone é obrigatório']"
              ></v-text-field>
            </v-flex>
          <v-flex xs12 sm2>
            <br>
            <!-- Butão de Cadastro do Responsável -->
            <v-btn
                  style="width: 150px;"
                  class="teal darken-1"
                  primary
                  @click="cadastraResponsaveis"
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
                  @click="limparFieldsResponsaveis"
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


export default {
  name: "cadastro_responsaveis",
  data () {
    return {
      nome: '',
      valid: false,
      congrega: '',
      tipo_responsavel: '',
      tel_responsavel: '',
      email_responsavel: '',
      carregadoCong: false,
      menu: false,
      lista_tipo_responsavel: [
        { text: 'Encarregado Geral' },
        { text: 'Encarregado de Congregação' },
        { text: 'Encarregado do Evento' },
        { text: 'Ajudante de Congregação' },
        { text: 'Ajudante do Evento' }
      ],
      lista_congregacao: []
    }
  },
  firebase: {
    congregacao : Congregacao
  },
  methods: {
      //Função de Cadastro
      cadastraResponsaveis() {
        if (this.$refs.form.validate()) {
            Responsaveis.push({
              nome: this.nome,
              tipo: this.tipo_responsavel,
              congregacao: this.congrega,
              email: this.email_responsavel,
              tel: this.tel_responsavel
            });
        }
      },
      //Alimenta Combobox Congregacao
      getCongregacao() {
        if (this.carregadoCong == false) {
          for (var i = 0; i < this.congregacao.length; i++) {
            this.lista_congregacao.push({ text: this.congregacao[i].nome });
          }
          this.lista_congregacao.sort("nome");
          this.carregadoCong = true;
        };
      },
      //Limpa Campos
      limparFieldsResponsaveis() {
        this.nome = ''
        this.tipo_responsavel = ''
        this.congrega = ''
        this.email_responsavel = ''
        this.tel_responsavel = ''
      }
    }
}
</script>
