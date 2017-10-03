<template>
  <div>
    <cadastro-congregacao></cadastro-congregacao>
    <consulta-congregacao></consulta-congregacao>
  </div>
</template>

<script>
import CadastroCongregacao from './cadastro-congregacao.component';
import ConsultaCongregacao from './consulta-congregacao.component';

export default {
  name: 'congregacao',
  components: {
    'cadastro-congregacao': CadastroCongregacao,
    'consulta-congregacao': ConsultaCongregacao
  },
  data() {
    return {
      menu:false
    }
  }
}
</script>
