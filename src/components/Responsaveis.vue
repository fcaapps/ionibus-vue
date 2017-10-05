<template>
  <div>
    <cadastro-responsaveis></cadastro-responsaveis>
    <consulta-responsaveis></consulta-responsaveis>
  </div>
</template>

<script>
import CadastroResponsaveis from './cadastro-responsaveis.component';
import ConsultaResponsaveis from './consulta-responsaveis.component';

export default {
  name: 'responsaveis',
  components: {
    'cadastro-responsaveis': CadastroResponsaveis,
    'consulta-responsaveis': ConsultaResponsaveis
  },
  data() {
    return {
      menu:false
    }
  }
}
</script>
