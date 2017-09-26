<template>
  <div>
    <v-card>
      <v-form v-model="valid" ref="form">
      <v-container grid-list-md>
        <v-layout row wrap style="margin: 30px;">
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
          <v-flex xs12 sm4>
            <br>
            <v-btn
                  class="blue-grey lighten-1"
                  round primary
                  @click="gravarEventos"
                >
                  <v-icon>save</v-icon>
                  <p style="margin: 5px;">Cadastrar</p>
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
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
              <v-dialog v-model="dialogEdit" persistent width="50%">
                <v-btn icon class="green--text" slot="activator">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Eventos</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Legal first name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field label="Legal last name" hint="example of persistent helper text"
                            persistent-hint
                            required
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Email" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Password" type="password" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-select
                            label="Age"
                            required
                            :items="['0-17', '18-29', '30-54', '54+']"
                          ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-select
                            label="Interests"
                            multiple
                            autocomplete
                            chips
                            :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                          ></v-select>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="blue--text darken-1" flat @click.native="dialogEdit = false">Fechar</v-btn>
                    <v-btn class="blue--text darken-1" flat @click.native="dialogEdit = false">Salvar</v-btn>
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
                    <div class="headline">Excluir Registro?</div>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="removeEventos(props.item)" class="green--text darken-1" flat="flat" @click.native="dialogExcluir = false">Sim</v-btn>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="dialogExcluir = false">Não</v-btn>
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
      gravarEventos() {
        if (this.$refs.form.validate()) {
            Eventos.push({
              tipo: this.evento,
              dt_evento: this.dt_evento,
              circuito: this.circuito,
              textobase: this.texto_base,
              localevento: this.local_evento,
              statusevento: this.status_evento
            });
        }
      },
      removeEventos(items) {
        Eventos.child(items['.key']).remove();
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
