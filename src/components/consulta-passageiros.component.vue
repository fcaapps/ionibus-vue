<template>
  <div class="consulta_passageiros">
    <v-card>
    <!-- Componente de Pesquisa   -->
    <v-container grid-list-md>
      <v-card-title style="margin-left: 30px; margin-right: 30px;">
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Pesquisar"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <!-- Grid com a consulta de Passageiros -->
      <v-data-table
          v-bind:headers="headers"
          v-bind:items="passageiros_i"
          v-bind:search="search"
        >
        <template slot="items" scope="props">
            <td class="text-xs-left">{{ props.item.nome }}</td>
            <td class="text-xs-left">{{ props.item.congregacao }}</td>
            <td class="text-xs-left">{{ props.item.capitao }}</td>
            <td class="text-xs-left">{{ props.item.rg_cpf }}</td>
            <td class="text-xs-left">{{ props.item.crianca_colo }}</td>
            <td class="text-xs-center">
              <!-- Janela Modal de Edição dos Passageiros -->
              <v-dialog v-model="dialogEdit" persistent height="80%" width="80%">
                <v-btn @click="getKey(props.item)" icon class="green--text" slot="activator">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-card>
                  <v-toolbar style="height: 40px;" class="teal">
                    <v-toolbar-title style="color: white; margin-left: 10px; margin-bottom: 23px;">Editando Passageiros</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout row wrap style="margin: 30px;">
                          <!-- Nome do Passageiro -->
                          <v-flex xs12 sm3>
                            <v-text-field
                              label="Nome"
                              v-model="nome"
                              item-value="text"
                              :rules="[(v) => !!v || 'Nome é obrigatório']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <!-- Congregação -->
                          <v-flex xs12 sm4>
                            <v-select
                              box
                              label="Congregacão"
                              v-bind:items="lista_congregacao"
                              v-model="congregacao"
                              item-value="text"
                              required
                              :rules="[(v) => !!v || 'Congregação é obrigatório']"
                          ></v-select>
                          </v-flex>
                          <!-- Capitão -->
                          <v-flex xs12 sm4>
                            <v-select
                              box
                              label="Capitão"
                              v-bind:items="lista_capitao"
                              v-model="capitao"
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
                              item-value="text"
                              :rules="[(v) => !!v || 'RG/CPF é obrigatório']"
                              required
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
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat @click.native="dialogEdit = false">
                      <v-icon>close</v-icon>
                      Fechar
                    </v-btn>
                    <v-btn @click="salvaEdicaoPassageiros(nome, congregacao, capitao, rg_cpf, crianca_colo)" class="green--text darken-1" flat @click.native="dialogEdit = false">
                      <v-icon>save</v-icon>
                      Salvar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
            <td class="text-xs-center">
              <v-dialog v-model="dialogExcluir" lazy absolute>
                <v-btn @click="getKey(props.item)" icon class="red--text" slot="activator">
                  <v-icon>remove_circle</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title>
                    <div class="headline">Excluir Passageiro?</div>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="removePassageiros()" class="green--text darken-1" flat="flat" @click.native="dialogExcluir = false">
                    <v-icon>check_circle</v-icon>
                    Sim
                  </v-btn>
                  <v-btn class="red--text darken-1" flat="flat" @click.native="dialogExcluir = false">
                    <v-icon>close</v-icon>
                    Não
                  </v-btn>
                </v-card>
              </v-dialog>
            </td>
        </template>
        <template slot="pageText" scope="{ pageStart, pageStop }">
          From {{ pageStart }} to {{ pageStop }}
        </template>
      </v-data-table>
    </v-container>
    </v-card>
  </div>
</template>
<script>
  import { Passageiros } from '.././firebase';
  import { Congregacao } from '.././firebase';
  import { Capitaes } from '.././firebase';

  import store from '.././store';

  let passageiros_i = []

  export default {
    name: "consulta_passageiros",
    data () {
      return {
        passageiros_i,
        nome: '',
        congregacao: '',
        capitao: '',
        rg_cpf: '',
        crianca_colo: '',
        lista_crianca_colo: [
          { text: 'Sim' },
          { text: 'Não' }
        ],
        carregadoCong: false,
        carregadoCapi: false,
        menu: false,
        modal: false,
        picker: null,
        formatted: null,
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        dialogEdit: false,
        dialogExcluir: false,
        keyPassageiro: '',
        headers: [
            { text: 'Nome', align: 'left'},
            { text: 'Congregação', align:'left'},
            { text: 'Capitão', align: 'left'},
            { text: 'Rg/Cpf', align: 'left'},
            { text: 'Criança Colo', align: 'center'},
            { text: 'Alterar', align: 'center'},
            { text: 'Excluir', align: 'center'}
          ],
        lista_congregacao: [],
        lista_capitao: []
      }
    },
    created: function(){
      this.$bindAsArray('passageiros_i', Passageiros);
    },
    firebase: {
      congrega : Congregacao,
      capita : Capitaes
    },
    methods: {
      //Excluir Passageiro Cadastrado
      removePassageiros() {
        Passageiros.child(this.keyPassageiro).remove();
      },
      //Alimenta Combobox Congregacao
      getCongregacao() {
        if (this.carregadoCong == false) {
          for (var i = 0; i < this.congrega.length; i++) {
            this.lista_congregacao.push({ text: this.congrega[i].nome });
          }
          this.carregadoCong = true;
        };
      },
      //Alimenta Combobox Capitão
      getCongregacao() {
        if (this.carregadoCapi == false) {
          for (var i = 0; i < this.capita.length; i++) {
            this.lista_capitao.push({ text: this.capita[i].nome });
          }
          this.carregadoCapi = true;
        };
      },
      //Recupera chave Json e alimenta campos de edição
      getKey(items){

        if (this.carregadoCong == false) {
          for (var i = 0; i < this.congrega.length; i++) {
            this.lista_congregacao.push({ text: this.congrega[i].nome });
          }
          this.carregadoCong = true;
        };

        if (this.carregadoCapi == false) {
          for (var i = 0; i < this.capita.length; i++) {
            this.lista_capitao.push({ text: this.capita[i].nome });
          }
          this.carregadoCapi = true;
        };

        this.keyPassageiro = items['.key'];

        this.nome = this.passageiros_i[this.passageiros_i.indexOf(items)].nome;
        this.congregacao = this.passageiros_i[this.passageiros_i.indexOf(items)].congregacao;
        this.capitao = this.passageiros_i[this.passageiros_i.indexOf(items)].capitao;
        this.rg_cpf = this.passageiros_i[this.passageiros_i.indexOf(items)].rg_cpf;
        this.crianca_colo = this.passageiros_i[this.passageiros_i.indexOf(items)].crianca_colo;

      },

      //Salva Registros Editados
      salvaEdicaoPassageiros(nome, congregacao, capitao, rg_cpf, crianca_colo) {
        Passageiros.child(this.keyPassageiro).set({
          nome,
          congregacao,
          capitao,
          rg_cpf,
          crianca_colo
        });
      }
    }
  }
</script>
