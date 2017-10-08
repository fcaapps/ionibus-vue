<template>
  <div>
    <cadastro-capitaes></cadastro-capitaes>
    <consulta-capitaes></consulta-capitaes>
  </div>
</template>

<script>
import CadastroCapitaes from './cadastro-capitaes.component';
import ConsultaCapitaes from './consulta-capitaes.component';

export default {
  name: 'capitaes',
  components: {
    'cadastro-capitaes': CadastroCapitaes,
    'consulta-capitaes': ConsultaCapitaes
  },
  data() {
    return {
      menu:false
    }
  }
}
</script>
