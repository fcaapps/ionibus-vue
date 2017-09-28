<template>
  <div id="cadastro_evento">
    <v-card>
      <!-- Toolbar no topo da página -->
      <v-toolbar style="height: 40px;" class="blue-grey lighten-4">
        <v-toolbar-title style="color: #1C1C1C; margin-left: 10px; margin-bottom: 20px;">Eventos</v-toolbar-title>
      </v-toolbar>
      <!-- Formulário de Cadastro com Validador -->
      <v-form v-model="valid" ref="form">
      <v-container grid-list-md>
        <v-layout row wrap style="margin-left: 30px; margin-right: 30px; margin-bottom: 8px; margin-top: 20px;">
            <!-- Tipo Evento -->
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
                    required
                    :rules="[(v) => !!v || 'Data do evento é obrigatório']"
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
          <v-flex xs12 sm2>
            <br>
            <!-- Butão de Cadastro do Evento -->
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
  </div>
</template>
<script>
import { Eventos } from '.././firebase';
import store from '.././store';

export default {
  name: "cadastro_evento",
  data () {
    return {
      tp_evento: '',
      dt_evento: '',
      circuito: '',
      texto_base: '',
      local_evento: '',
      status_evento: '',
      items: [this.eventos],
      menu: false,
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
    }
  },
  methods: {
      //Função de Cadastro
      cadastraEventos() {
        if (this.$refs.form.validate()) {
            Eventos.push({
              tipo: this.tp_evento,
              dt_evento: this.dt_evento,
              circuito: this.circuito,
              textobase: this.texto_base,
              localevento: this.local_evento,
              statusevento: this.status_evento
            });
        }
      }
    }
}
</script>
