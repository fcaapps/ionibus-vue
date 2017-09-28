<template>
  <div>
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
          v-bind:items="eventos_i"
          v-bind:search="search"
        >
        <template slot="items" scope="props">
            <td class="text-xs-left">{{ props.item.tipo }}</td>
            <td class="text-xs-center">{{ props.item.dt_evento }}</td>
            <td class="text-xs-left">{{ props.item.circuito }}</td>
            <td class="text-xs-left">{{ props.item.textobase }}</td>
            <td class="text-xs-left">{{ props.item.localevento }}</td>
            <td class="text-xs-center">{{ props.item.statusevento }}</td>
            <td class="text-xs-center">
              <!-- Janela Modal de Edição dos Eventos -->
              <v-dialog v-model="dialogEdit" persistent height="80%" width="80%">
                <v-btn @click="getKey(props.item)" icon class="green--text" slot="activator">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-card>
                  <v-toolbar style="height: 40px;" class="blue-grey lighten-4">
                    <v-toolbar-title style="color: black; margin-left: 10px; margin-bottom: 20px;">Editando Eventos</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout row wrap style="margin: 30px;">
                          <!-- Tipo de Evento -->
                          <v-flex xs12 sm3>
                            <v-select
                              box
                              label="Tipo"
                              v-bind:items="lista_tipo_evento"
                              v-model="tp_evento"
                              item-value="text"
                              :rules="[(v) => !!v || 'Tipo é obrigatório']"
                              required
                            ></v-select>
                          </v-flex>
                          <!-- Data do Evento -->
                          <v-flex xs12 sm3>
                              <v-menu
                                lazy
                                :close-on-content-click="true"
                                v-model="menu"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-left="40"
                                max-width="290px"
                              >
                                <v-text-field
                                  slot="activator"
                                  label="Data do Evento"
                                  v-model="dt_evento"
                                  prepend-icon="event"
                                ></v-text-field>
                                <v-date-picker
                                  v-model="dt_evento"
                                  no-title scrollable actions
                                  required>
                                  <!-- <template scope="{ save, cancel }">
                                    <v-card-actions>
                                      <v-btn flat primary @click.native="cancel()">Cancelar</v-btn>
                                      <v-btn flat primary @click.native="save()">Ok</v-btn>
                                    </v-card-actions>
                                  </template> -->
                                </v-date-picker>
                              </v-menu>
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
                          <!-- Texto Base -->
                          <v-flex xs12 sm3>
                            <v-text-field
                              label="Texto Base"
                              v-model="texto_base"
                            ></v-text-field>
                          </v-flex>
                          <!-- Local do Evento -->
                          <v-flex xs12 sm4>
                            <v-select
                              box
                              label="Local do Evento"
                              v-bind:items="lista_local_evento"
                              v-model="local_evento"
                              item-value="text"
                              required
                              :rules="[(v) => !!v || 'Local do evento é obrigatório']"
                            ></v-select>
                          </v-flex>
                          <!-- Status do Evento -->
                          <v-flex xs12 sm4>
                            <v-select
                              box
                              label="Status do Evento"
                              v-bind:items="lista_status_evento"
                              v-model="status_evento"
                              item-value="text"
                              required
                              :rules="[(v) => !!v || 'Status do evento é obrigatório']"
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
                    <v-btn @click="salvaEdicaoEventos(tp_evento, dt_evento, circuito, texto_base, local_evento, status_evento)" class="green--text darken-1" flat @click.native="dialogEdit = false">
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
                    <div class="headline">Excluir Evento?</div>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="removeEventos()" class="green--text darken-1" flat="flat" @click.native="dialogExcluir = false">
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
  import { Eventos } from '.././firebase';
  import store from '.././store';

  let eventos_i = []

  export default {
    name: "consulta_evento",
    data () {
      return {
        eventos_i,
        tp_evento: '',
        dt_evento: '',
        circuito: '',
        texto_base: '',
        local_evento: '',
        status_evento: '',
        lista_tipo_evento: [
            { text: 'Congresso Regional' },
            { text: 'Assembléia Especial' },
            { text: 'Assembléia de Circuito' }
          ],
        lista_circuito: [
          { text: 'CE01 - CIRCUITO CE O1' },
          { text: 'CE02 - CIRCUITO CE O2' }
        ],
        lista_local_evento: [
          { text: 'Salão de Assembléias' },
          { text: 'Ginásio Paulo Sarasate' },
          { text: 'Estádio Castelão' }
        ],
        lista_status_evento: [
          { text: 'Aberto' },
          { text: 'Encerrado' }
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
        keyEvento: '',
        headers: [
            { text: 'Tipo', align: 'left', value: 'tipo'},
            { text: 'Data', align: 'dt_evento'},
            { text: 'Circuito', align:'left', value: 'circuito'},
            { text: 'Texto', align: 'left', value: 'textobase'},
            { text: 'Local', align: 'left', value: 'localevento'},
            { text: 'Status', align: 'center', value: 'statusevento'},
            { text: 'Alterar', align: 'center'},
            { text: 'Excluir', align: 'center'}
          ],
        items: [this.eventos]
      }
    },
    created: function(){
      this.$bindAsArray('eventos_i', Eventos);
    },
    methods: {
      //Excluir Eventos Cadastrado
      removeEventos() {
        Eventos.child(this.keyEvento).remove();
      },

      //Recupera chave Json e alimenta campos de edição
      getKey(items){

        this.keyEvento = items['.key'];

        this.tp_evento = this.eventos_i[this.eventos_i.indexOf(items)].tipo;
        this.dt_evento = this.eventos_i[this.eventos_i.indexOf(items)].dt_evento;
        this.circuito = this.eventos_i[this.eventos_i.indexOf(items)].circuito;
        this.local_evento = this.eventos_i[this.eventos_i.indexOf(items)].localevento;
        this.status_evento = this.eventos_i[this.eventos_i.indexOf(items)].statusevento;
        this.texto_base = this.eventos_i[this.eventos_i.indexOf(items)].textobase;

      },

      //Salva Registros Editados
      salvaEdicaoEventos(tipo, dt_evento, circuito, textobase, localevento, statusevento) {
        Eventos.child(this.keyEvento).set({
          tipo,
          dt_evento,
          circuito,
          textobase,
          localevento,
          statusevento
        });
      }
    }
  }
</script>
