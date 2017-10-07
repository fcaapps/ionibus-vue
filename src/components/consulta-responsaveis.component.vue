<template>
  <div class="consulta_responsaveis">
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
          v-bind:items="responsavel_i"
          v-bind:search="search"
        >
        <template slot="items" scope="props">
            <td class="text-xs-left">{{ props.item.nome }}</td>
            <td class="text-xs-left">{{ props.item.tipo }}</td>
            <td class="text-xs-left">{{ props.item.congregacao }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.tel }}</td>
            <td class="text-xs-center">
              <!-- Janela Modal de Edição dos Eventos -->
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
                          <!-- Nome do Responsável -->
                          <v-flex xs12 sm3>
                            <v-text-field
                              label="Nome"
                              v-model="nome"
                              item-value="text"
                              :rules="[(v) => !!v || 'Nome é obrigatório']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <!-- Tipo do Responsável -->
                          <v-flex xs12 sm4>
                            <v-select
                              box
                              label="Tipo"
                              v-bind:items="lista_tipo_responsavel"
                              v-model="tipo"
                              item-value="text"
                              required
                              :rules="[(v) => !!v || 'Tipo é obrigatório']"
                          ></v-select>
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
                          <!-- Email do Responsável -->
                          <v-flex xs12 sm4>
                            <v-text-field
                              label="Email Resp."
                              v-model="email_responsavel"
                              item-value="text"
                              :rules="[(v) => !!v || 'Email é obrigatório']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <!-- Telefone Responsável -->
                          <v-flex xs12 sm4>
                            <v-text-field
                              label="Tel. Resp."
                              v-model="tel_responsavel"
                              item-value="text"
                              :rules="[(v) => !!v || 'Telefone é obrigatório']"
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
                    <v-btn @click="salvaEdicaoResponsaveis(nome, tipo, congregacao, email_responsavel, tel_responsavel)" class="green--text darken-1" flat @click.native="dialogEdit = false">
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
                    <div class="headline">Excluir Responsável?</div>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="removeResponsaveis()" class="green--text darken-1" flat="flat" @click.native="dialogExcluir = false">
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

  import store from '.././store';

  let responsavel_i = []

  export default {
    name: "consulta_responsaveis",
    data () {
      return {
        responsavel_i,
        nome: '',
        tipo: '',
        congregacao: '',
        email_responsavel: '',
        tel_responsavel: '',
        carregadoCong: false,
        lista_tipo_responsavel: [
          { text: 'Encarregado Geral' },
          { text: 'Encarregado de Congregação' },
          { text: 'Encarregado do Evento' },
          { text: 'Ajudante de Congregação' },
          { text: 'Ajudante do Evento' }
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
        keyResponsavel: '',
        headers: [
            { text: 'Nome', align: 'left'},
            { text: 'Tipo', align:'left'},
            { text: 'Congregação', align:'left'},
            { text: 'Email. Resp.', align: 'left'},
            { text: 'Tel Resp.', align: 'left'},
            { text: 'Alterar', align: 'center'},
            { text: 'Excluir', align: 'center'}
          ],
        // items: [this.responsaveis],
        lista_congregacao: []
      }
    },
    created: function(){
      this.$bindAsArray('responsavel_i', Responsaveis);
    },
    firebase: {
      congrega : Congregacao
    },
    methods: {
      //Excluir Eventos Cadastrado
      removeResponsaveis() {
        Responsaveis.child(this.keyResponsavel).remove();
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
      //Recupera chave Json e alimenta campos de edição
      getKey(items){

        if (this.carregadoCong == false) {
          for (var i = 0; i < this.congrega.length; i++) {
            this.lista_congregacao.push({ text: this.congrega[i].nome });
          }
          this.carregadoCong = true;
        };
        this.keyResponsavel = items['.key'];

        this.nome = this.responsavel_i[this.responsavel_i.indexOf(items)].nome;
        this.tipo = this.responsavel_i[this.responsavel_i.indexOf(items)].tipo;
        this.congregacao = this.responsavel_i[this.responsavel_i.indexOf(items)].congregacao;
        this.email_responsavel = this.responsavel_i[this.responsavel_i.indexOf(items)].email;
        this.tel_responsavel = this.responsavel_i[this.responsavel_i.indexOf(items)].tel;

      },

      //Salva Registros Editados
      salvaEdicaoResponsaveis(nome, tipo, congregacao, email_responsavel, tel_responsavel) {
        Responsaveis.child(this.keyResponsavel).set({
          nome,
          tipo,
          congregacao,
          email: email_responsavel,
          tel: tel_responsavel
        });
      }
    }
  }
</script>
