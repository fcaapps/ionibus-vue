<template>
  <div>
    <v-card>
      <v-toolbar style="height: 40px;" class="blue-grey lighten-4">
        <v-toolbar-title style="color: #1C1C1C; margin-left: 10px; margin-bottom: 20px;">Eventos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          style="margin-bottom: 30px;"
          icon
          light
          @click.stop="fixed = !fixed"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <!-- <v-btn icon class="red--text" slot="activator">
          <v-icon>remove_circle</v-icon>
        </v-btn> -->
      </v-toolbar>
      <v-form v-model="valid" ref="form">
      <v-container grid-list-md>
        <v-layout row wrap style="margin-left: 30px; margin-right: 30px; margin-bottom: 20px;">
            <v-flex xs12 sm3>
              <v-select
                box
                label="Tipo"
                v-bind:items="tipo_evento"
                v-model="evento"
                item-value="text"
                :rules="[(v) => !!v || 'Tipo é obrigatório']"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 sm3>
                <v-menu
                  lazy
                  :close-on-content-click="false"
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
                    readonly
                    required
                    :rules="[(v) => !!v || 'Data do evento é obrigatório']"
                  ></v-text-field>
                  <v-date-picker
                    v-model="dt_evento"
                    no-title scrollable actions
                    required>
                    <template scope="{ save, cancel }">
                      <v-card-actions>
                        <v-btn flat primary @click.native="cancel()">Cancelar</v-btn>
                        <v-btn flat primary @click.native="save()">Ok</v-btn>
                      </v-card-actions>
                    </template>
                  </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs12 sm3>
              <v-select
                box
                label="Circuito"
                v-bind:items="circuitoi"
                v-model="circuito"
                item-value="text"
                required
                :rules="[(v) => !!v || 'Circuito é obrigatório']"

              ></v-select>
            </v-flex>
            <v-flex xs12 sm3>
              <v-text-field label="Texto Base" v-model="texto_base"></v-text-field>
            </v-flex>
            <v-flex xs12 sm4>
              <v-select
                box
                label="Local do Evento"
                v-bind:items="local_eventoi"
                v-model="local_evento"
                item-value="text"
                required
                :rules="[(v) => !!v || 'Local do evento é obrigatório']"

              ></v-select>
            </v-flex>
            <v-flex xs12 sm4>
              <v-select
                box
                label="Status do Evento"
                v-bind:items="status_eventoi"
                v-model="status_evento"
                item-value="text"
                required
                :rules="[(v) => !!v || 'Status do evento é obrigatório']"

              ></v-select>
            </v-flex>
          <v-flex xs12 sm2>
            <br>
            <v-btn
                  class="blue-grey lighten-1"
                  round primary
                  @click="cadastraEventos"
                >
                  <v-icon>save</v-icon>
                  <p style="margin: 5px;">Cadastrar</p>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      </v-form>
    </v-card>
    <v-card>
    <v-container grid-list-md>
      <v-card-title style="margin-left: 30px; margin-right: 30px;">
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
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
              <v-dialog v-model="dialogEdit" persistent height="80%" width="80%">
                <v-btn icon class="green--text" slot="activator">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-card>
                  <v-toolbar style="height: 40px;" class="blue-grey lighten-4">
                    <v-toolbar-title style="color: black; margin-left: 10px; margin-bottom: 20px;">Editando Eventos</v-toolbar-title>
                  </v-toolbar>
                  <!-- <v-card-title>
                    <span class="headline">Editando Eventos</span>
                  </v-card-title> -->
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout row wrap style="margin: 30px;">
                          <v-flex xs12 sm3>
                            <v-select
                              box
                              label="Tipo"
                              v-bind:items="tipo_evento"
                              v-model="props.item.tipo"
                              item-value="text"
                              :rules="[(v) => !!v || 'Tipo é obrigatório']"
                              required
                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="menuEdit"
                                transition="scale-transition"
                                offset-y
                                full-width
                                :nudge-left="40"
                                max-width="290px"
                              >
                                <v-text-field
                                  slot="activator"
                                  label="Data do Evento"
                                  v-model="props.item.dt_evento"
                                  prepend-icon="event"
                                  readonly
                                  required
                                  :rules="[(v) => !!v || 'Data do evento é obrigatório']"
                                ></v-text-field>
                                <v-date-picker
                                  v-model="props.item.dt_evento"
                                  no-title scrollable actions
                                  required>
                                  <template scope="{ save, cancel }">
                                    <v-card-actions>
                                      <v-btn flat primary @click.native="cancel()">Cancelar</v-btn>
                                      <v-btn flat primary @click.native="save()">Ok</v-btn>
                                    </v-card-actions>
                                  </template>
                                </v-date-picker>
                              </v-menu>
                          </v-flex>
                          <v-flex xs12 sm3>
                            <v-select
                              box
                              label="Circuito"
                              v-bind:items="circuitoi"
                              v-model="props.item.circuito"
                              item-value="text"
                              required
                              :rules="[(v) => !!v || 'Circuito é obrigatório']"

                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm3>
                            <v-text-field label="Texto Base" v-model="props.item.textobase"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm4>
                            <v-select
                              box
                              label="Local do Evento"
                              v-bind:items="local_eventoi"
                              v-model="props.item.localevento"
                              item-value="text"
                              required
                              :rules="[(v) => !!v || 'Local do evento é obrigatório']"

                            ></v-select>
                          </v-flex>
                          <v-flex xs12 sm4>
                            <v-select
                              box
                              label="Status do Evento"
                              v-bind:items="status_eventoi"
                              v-model="props.item.statusevento"
                              item-value="text"
                              required
                              :rules="[(v) => !!v || 'Status do evento é obrigatório']"

                            ></v-select>
                          </v-flex>
                      </v-layout>
                    </v-container>
                    <!-- <small>* Campo Obrigatório</small> -->
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat @click.native="dialogEdit = false">
                      <v-icon>close</v-icon>
                      Fechar
                    </v-btn>
                    <v-btn @click="editaEventos(props.item, props.item.tipo, props.item.dt_evento, props.item.circuito, props.item.textobase, props.item.localevento, props.item.statusevento)" class="green--text darken-1" flat @click.native="dialogEdit = false">
                      <v-icon>save</v-icon>
                      Salvar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
            <td class="text-xs-center">
              <v-dialog v-model="dialogExcluir" lazy absolute>
                <v-btn icon class="red--text" slot="activator">
                  <v-icon>remove_circle</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title>
                    <div class="headline">Excluir Evento?</div>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="removeEventos(props.item)" class="green--text darken-1" flat="flat" @click.native="dialogExcluir = false">
                      <v-icon>check_circle</v-icon>
                      Sim
                    </v-btn>
                    <v-btn class="red--text darken-1" flat="flat" @click.native="dialogExcluir = false">
                      <v-icon>close</v-icon>
                      Não
                    </v-btn>
                  </v-card-actions>
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

let eventos_i = [];

console.log(eventos_i);

export default {
  name: 'eventos',
  data () {
    return {
      first: 'John',
      last: 'Doe',
      email: '',
      eventos_i,
      evento: '',
      dt_evento: '',
      circuito: '',
      texto_base: '',
      local_evento: '',
      status_evento: '',
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      tipo_evento: [
          { text: 'Congresso Regional' },
          { text: 'Assembléia Especial' },
          { text: 'Assembléia de Circuito' }
        ],
      circuitoi: [
        { text: 'CE01 - CIRCUITO CE O1' },
        { text: 'CE02 - CIRCUITO CE O2' }
      ],
      local_eventoi: [
        { text: 'Salão de Assembléias' },
        { text: 'Ginásio Paulo Sarasate' },
        { text: 'Estádio Castelão' }
      ],
      status_eventoi: [
        { text: 'Aberto' },
        { text: 'Encerrado' }
      ],
      dt_evento: null,
      menu: false,
      menuEdit: false,
      modal: false,
      picker: null,
      formatted: null,
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      dialogEdit: false,
      dialogExcluir: false,
      headers: [
          { text: 'Tipo', align: 'left', value: 'tipo'},
          { text: 'Data do Evento', align: 'dt_evento'},
          { text: 'Circuito', align:'left', value: 'circuito'},
          { text: 'Texto Base', align: 'left', value: 'textobase'},
          { text: 'Local do Evento', align: 'left', value: 'localevento'},
          { text: 'Status do Evento', align: 'center', value: 'statusevento'},
          { text: 'Alterar', align: 'center'},
          { text: 'Excluir', align: 'center'},

        ],
      items: [this.eventos]
    }
  },
  created: function(){
    this.$bindAsArray('eventos_i', Eventos);
  },
  firebase: {
      eventos: Eventos
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },

    methods: {
      getConfig() {
        return console.log(store.getters.getConfig);
      },
      cadastraEventos() {
        if (this.$refs.form.validate()) {
            Eventos.push({
              tipo: this.evento,
              dt_evento: this.dt_evento,
              circuito: this.circuito,
              textobase: this.texto_base,
              localevento: this.local_evento,
              statusevento: this.status_evento,
              // edit: false
            });
        }
      },
      removeEventos(items) {
        Eventos.child(items['.key']).remove();
      },

      editaEventos(items, tipo, dt_evento, circuito, textobase, localevento, statusevento) {
        Eventos.child(items['.key']).set({
          tipo,
          dt_evento,
          circuito,
          textobase,
          localevento,
          statusevento
        })
      },
      atualizaEventos(items) {
        Eventos.child(items['.key']);
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
