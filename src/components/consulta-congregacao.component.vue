<template>
  <div class="consulta-congregacao">
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
      <!-- Grid com a consulta do Evento -->
      <v-data-table
          v-bind:headers="headers"
          v-bind:items="congregacao_i"
          v-bind:search="search"
        >
        <template slot="items" scope="props">
            <td class="text-xs-left">{{ props.item.nome }}</td>
            <td class="text-xs-left">{{ props.item.endereco }}</td>
            <td class="text-xs-left">{{ props.item.coordenador }}</td>
            <td class="text-xs-left">{{ props.item.tel_coordenador }}</td>
            <td class="text-xs-left">{{ props.item.email_coordenador }}</td>
            <td class="text-xs-left">{{ props.item.circuito }}</td>
            <td class="text-xs-center">
              <!-- Janela Modal de Edição dos Eventos -->
              <v-dialog v-model="dialogEdit" persistent height="80%" width="80%">
                <v-btn @click="getKey(props.item)" icon class="green--text" slot="activator">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-card>
                  <v-toolbar style="height: 40px;" class="teal">
                    <v-toolbar-title style="color: white; margin-left: 10px; margin-bottom: 23px;">Editando Congregação</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout row wrap style="margin: 30px;">
                          <!-- Nome da Congregação -->
                          <v-flex xs12 sm3>
                            <v-text-field
                              label="Nome"
                              v-model="nome"
                              item-value="text"
                              :rules="[(v) => !!v || 'Nome é obrigatório']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <!-- Endereço -->
                          <v-flex xs12 sm3>
                            <v-text-field
                              label="Endereço"
                              v-model="endereco"
                              item-value="text"
                              :rules="[(v) => !!v || 'Endereço é obrigatório']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <!-- Coordenador -->
                          <v-flex xs12 sm3>
                            <v-text-field
                              label="Coordenador"
                              v-model="coordenador"
                              item-value="text"
                              :rules="[(v) => !!v || 'Coordenador é obrigatório']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <!-- Telefone Coordenador -->
                          <v-flex xs12 sm3>
                            <v-text-field
                              label="Telefone Coordenador"
                              v-model="tel_coordenador"
                              item-value="text"
                              :rules="[(v) => !!v || 'Telefone é obrigatório']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <!-- Email Coordenador -->
                          <v-flex xs12 sm3>
                            <v-text-field
                              label="Email Coordenador"
                              v-model="email_coordenador"
                              item-value="text"
                              :rules="[(v) => !!v || 'Email é obrigatório']"
                              required
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
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat @click.native="dialogEdit = false">
                      <v-icon>close</v-icon>
                      Fechar
                    </v-btn>
                    <v-btn @click="salvaEdicaoCongregacao(nome, endereco, coordenador, tel_coordenador, email_coordenador, circuito)" class="green--text darken-1" flat @click.native="dialogEdit = false">
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
                    <div class="headline">Excluir Congregação?</div>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="removeCongregacao()" class="green--text darken-1" flat="flat" @click.native="dialogExcluir = false">
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
  import { Congregacao } from '.././firebase';
  import store from '.././store';

  let congregacao_i = []

  export default {
    name: "consulta_congregacao",
    data () {
      return {
        congregacao_i,
        nome: '',
        endereco: '',
        coordenador: '',
        tel_coordenador: '',
        email_coordenador: '',
        circuito: '',
        lista_circuito: [
          { text: 'CE01 - CIRCUITO CE O1' },
          { text: 'CE02 - CIRCUITO CE O2' }
        ],
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
        keyCongregacao: '',
        headers: [
            { text: 'Nome', align: 'left', value: 'nome'},
            { text: 'Endereco', align:'left', value: 'endereco'},
            { text: 'Coordenador', align:'left', value: 'coordenador'},
            { text: 'Tel. Coord.', align: 'left', value: 'tel_coordenador'},
            { text: 'Email Coord.', align: 'left', value: 'email_coordenador'},
            { text: 'Circuito', align: 'center', value: 'circuito'},
            { text: 'Alterar', align: 'center'},
            { text: 'Excluir', align: 'center'}
          ],
        items: [this.congregacao]
      }
    },
    created: function(){
      this.$bindAsArray('congregacao_i', Congregacao);
    },
    methods: {
      //Excluir Eventos Cadastrado
      removeCongregacao() {
        Congregacao.child(this.keyCongregacao).remove();
      },

      //Recupera chave Json e alimenta campos de edição
      getKey(items){

        this.keyCongregacao = items['.key'];

        this.nome = this.congregacao_i[this.congregacao_i.indexOf(items)].nome;
        this.endereco = this.congregacao_i[this.congregacao_i.indexOf(items)].endereco;
        this.coordenador = this.congregacao_i[this.congregacao_i.indexOf(items)].coordenador;
        this.tel_coordenador = this.congregacao_i[this.congregacao_i.indexOf(items)].tel_coordenador;
        this.email_coordenador = this.congregacao_i[this.congregacao_i.indexOf(items)].email_coordenador;
        this.circuito = this.congregacao_i[this.congregacao_i.indexOf(items)].circuito;

      },

      //Salva Registros Editados
      salvaEdicaoCongregacao(nome, endereco, coordenador, tel_coordenador, email_coordenador, circuito) {
        Congregacao.child(this.keyCongregacao).set({
          nome,
          endereco,
          coordenador,
          tel_coordenador,
          email_coordenador,
          circuito
        });
      }
    }
  }
</script>
