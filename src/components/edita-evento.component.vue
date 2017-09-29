<template>
  <div id="edita_evento">
    <!-- Janela Modal de Edição dos Eventos -->
    <v-dialog v-model="dialogEdit" persistent height="80%" width="80%">
      <v-btn @click="getKey(props.items)" icon class="green--text" slot="activator">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        <v-toolbar style="height: 40px;" class="teal">
          <v-toolbar-title style="color: white; margin-left: 10px; margin-bottom: 23px;">Editando Eventos</v-toolbar-title>
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
                    v-model="tpEvento"
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
                        v-model="dtEvento"
                        prepend-icon="event"
                      ></v-text-field>
                      <v-date-picker
                        v-model="dtEvento"
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
                    v-model="textoBase"
                  ></v-text-field>
                </v-flex>
                <!-- Local do Evento -->
                <v-flex xs12 sm4>
                  <v-select
                    box
                    label="Local do Evento"
                    v-bind:items="lista_local_evento"
                    v-model="localEvento"
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
                    v-model="statusEvento"
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
          <v-btn @click="salvaEdicaoEventos(tpEvento, dtEvento, circuito, textoBase, localEvento, statusEvento)" class="green--text darken-1" flat @click.native="dialogEdit = false">
            <v-icon>save</v-icon>
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import { Eventos } from '.././firebase';
import store from '.././store';

export default {
  name: "edita_evento",
  data () {
    return {
      menu: false,
      dialogEdit: false,
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
      ]
    }
  },
  computed: {
    tpEvento() {
      return store.getters.getTpEvento
    },
    dtEvento() {
      return store.getters.getDtEvento
    },
    circuito() {
      return store.getters.getCircuito
    },
    textoBase() {
      return store.getters.getTextoBase
    },
    localEvento() {
      return store.getters.getLocalEvento
    },
    statusEvento() {
      return store.getters.getStatusEvento
    },
    keyEvento() {
      return store.getters.getKeyEvento
    }
  },

  methods: {

    getTeste() {
      console.log(this.keyEvento);
    },

    //Salva Registros Editados
    salvaEdicaoEventos(tipo, dt_evento, circuito, textobase, localevento, statusevento) {
      Eventos.child(this.keyEvento()).set({
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
