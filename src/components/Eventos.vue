<template>
  <div>
    <cadastro-evento></cadastro-evento>
    <consulta-evento></consulta-evento>
  </div>
</template>

<script>
import CadastroEvento from './cadastro-evento.component';
import ConsultaEvento from './consulta-evento.component';

export default {
  name: 'eventos',
  components: {
    'cadastro-evento': CadastroEvento,
    'consulta-evento': ConsultaEvento
  },
  data() {
    return {
      menu:false
    }
  }
}
</script>
