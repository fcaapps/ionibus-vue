<template>
  <div>
    <cadastro-passageiros></cadastro-passageiros>
    <consulta-passageiros></consulta-passageiros>
  </div>
</template>

<script>
import CadastroPassageiros from './cadastro-passageiros.component';
import ConsultaPassageiros from './consulta-passageiros.component';

export default {
  name: 'passageiros',
  components: {
    'cadastro-passageiros': CadastroPassageiros,
    'consulta-passageiros': ConsultaPassageiros
  },
  data() {
    return {
      menu:false
    }
  }
}
</script>
