<template>
  <div class="consulta_capitaes">
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
      <!-- Grid com a consulta de Capitães -->
      <v-data-table
          v-bind:headers="headers"
          v-bind:items="capitaes_i"
          v-bind:search="search"
        >
        <template slot="items" scope="props">
            <td class="text-xs-left">{{ props.item.nome }}</td>
            <td class="text-xs-left">{{ props.item.congregacao }}</td>
            <td class="text-xs-left">{{ props.item.responsavel }}</td>
            <td class="text-xs-left">{{ props.item.tel_1 }}</td>
            <td class="text-xs-left">{{ props.item.tel_2 }}</td>
            <td class="text-xs-center">
              <!-- Janela Modal de Edição dos Capitães -->
              <v-dialog v-model="dialogEdit" persistent height="80%" width="80%">
                <v-btn @click="getKey(props.item)" icon class="green--text" slot="activator">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-card>
                  <v-toolbar style="height: 40px;" class="teal">
                    <v-toolbar-title style="color: white; margin-left: 10px; margin-bottom: 23px;">Editando Responsável</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout row wrap style="margin: 30px;">
                          <!-- Nome do Capitão -->
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
                          <!-- Responsável -->
                          <v-flex xs12 sm4>
                            <v-select
                              box
                              label="Responsável"
                              v-bind:items="lista_responsavel"
                              v-model="responsavel"
                              item-value="text"
                              required
                              :rules="[(v) => !!v || 'Responsável é obrigatório']"
                          ></v-select>
                          </v-flex>
                          <!-- Telefone 1 -->
                          <v-flex xs12 sm4>
                            <v-text-field
                              label="Telefone 1"
                              v-model="tel_1"
                              item-value="text"
                              :rules="[(v) => !!v || 'Telefone 1 é obrigatório']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <!-- Telefone 2 -->
                          <v-flex xs12 sm4>
                            <v-text-field
                              label="Telefone 2"
                              v-model="tel_2"
                              item-value="text"
                              :rules="[(v) => !!v || 'Telefone 2 é obrigatório']"
                              required
                            ></v-text-field>
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
                    <v-btn @click="salvaEdicaoCapitaes(nome, congregacao, responsavel, tel_1, tel_2)" class="green--text darken-1" flat @click.native="dialogEdit = false">
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
                    <div class="headline">Excluir Capitão?</div>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="removeCapitaes()" class="green--text darken-1" flat="flat" @click.native="dialogExcluir = false">
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
  import { Responsaveis } from '.././firebase';
  import { Congregacao } from '.././firebase';
  import { Capitaes } from '.././firebase';

  import store from '.././store';

  let capitaes_i = []

  export default {
    name: "consulta_capitaes",
    data () {
      return {
        capitaes_i,
        nome: '',
        congregacao: '',
        responsavel: '',
        tel_1: '',
        tel_2: '',
        carregadoCong: false,
        carregadoResp: false,
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
        keyCapitao: '',
        headers: [
            { text: 'Nome', align: 'left'},
            { text: 'Congregação', align:'left'},
            { text: 'Responsável.', align: 'left'},
            { text: 'Telefone 1', align: 'left'},
            { text: 'Telefone 2', align: 'left'},
            { text: 'Alterar', align: 'center'},
            { text: 'Excluir', align: 'center'}
          ],
        lista_congregacao: [],
        lista_responsavel: []
      }
    },
    created: function(){
      this.$bindAsArray('capitaes_i', Capitaes);
    },
    firebase: {
      congrega : Congregacao,
      responsa : Responsaveis
    },
    methods: {
      //Excluir Responsaveis Cadastrado
      removeCapitaes() {
        Capitaes.child(this.keyCapitao).remove();
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
      //Alimenta Combobox Responsvael
      getCongregacao() {
        if (this.carregadoResp == false) {
          for (var i = 0; i < this.responsa.length; i++) {
            this.lista_responsavel.push({ text: this.responsa[i].nome });
          }
          this.carregadoResp = true;
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

        if (this.carregadoResp == false) {
          for (var i = 0; i < this.responsa.length; i++) {
            this.lista_responsavel.push({ text: this.responsa[i].nome });
          }
          this.carregadoResp = true;
        };

        this.keyCapitao = items['.key'];

        this.nome = this.capitaes_i[this.capitaes_i.indexOf(items)].nome;
        this.congregacao = this.capitaes_i[this.capitaes_i.indexOf(items)].congregacao;
        this.responsavel = this.capitaes_i[this.capitaes_i.indexOf(items)].responsavel;
        this.tel_1 = this.capitaes_i[this.capitaes_i.indexOf(items)].tel_1;
        this.tel_2 = this.capitaes_i[this.capitaes_i.indexOf(items)].tel_2;

      },

      //Salva Registros Editados
      salvaEdicaoCapitaes(nome, congregacao, responsavel, tel_1, tel_2) {
        Capitaes.child(this.keyCapitao).set({
          nome,
          congregacao,
          responsavel,
          tel_1,
          tel_2
        });
      }
    }
  }
</script>
