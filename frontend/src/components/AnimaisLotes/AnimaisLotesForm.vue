<template>
  <div>
    <b-form id="relacoes-form" @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-0" label="Animal:" label-for="input-0">
        <b-form-select 
          v-model="form.fk_id_animal" :disabled="disabled"
          id="input-4" 
        >
          <option :value="null" disabled>Selecione um animal</option>
          <b-form-select-option-group label="ID - Nome do Animal">
          <option v-for="option in options_animais" :value="option.id" :key="option.id">
             {{ option.id }} - {{ option.nome  }}
          </option>
          </b-form-select-option-group>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-1" label="Lote:" label-for="input-1">
        <b-form-select 
          v-model="form.fk_id_lote" :disabled="disabled"
          id="input-4" 
        >
          <option :value="null" disabled>Selecione um lote</option>
          <b-form-select-option-group label="ID - Nome do Lote">
            <option v-for="option in options_lotes" :value="option.id" :key="option.id">
               {{ option.id }} - {{ option.nome  }}
            </option>
          </b-form-select-option-group>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Data de Entrada:" label-for="input-2">
        <VueDatePicker v-model="form.dt_entrada" auto-apply :close-on-auto-apply="false" :enable-time-picker="false" required :disabled="disabled" format="dd/MM/yyyy" timezone="UTC" locale="pt-BR" placeholder="Insira a data de entrada"/>
      </b-form-group>

      <b-form-group id="input-group-3" label="Data de Saída:" label-for="input-3">
        <VueDatePicker v-model="form.dt_saida" auto-apply :close-on-auto-apply="false" :enable-time-picker="false" required :disabled="disabled" format="dd/MM/yyyy" timezone="UTC"
        locale="pt-BR" placeholder="Insira a data de saída"/>
      </b-form-group>

      <b-form-group id="input-group-4" label="Data de Última Movimentação:">
        <VueDatePicker v-model="form.dt_ultima_movimentacao" auto-apply :close-on-auto-apply="false" :enable-time-picker="false" required :disabled="disabled" format="dd/MM/yyyy" timezone="UTC"
        locale="pt-BR" placeholder="Insira a data da última movimentação"/>
      </b-form-group>

      <b-form-group id="input-group-5" label="IC Bezerro">
        <b-form-radio-group id="radio-group" name="radio-group" :disabled="disabled">
          <b-form-radio v-model="form.ic_bezerro" value="true">Ativo</b-form-radio>
          <b-form-radio v-model="form.ic_bezerro" value="false">Inativo</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <slot />

    </b-form>
  </div>
</template>
<script>
  import handleLote from '../../api/lote';
  import handleAnimal from '../../api/animal';
  export default {
    data() {
      return {
        form: { id: "", fk_id_animal: null, fk_id_lote: null, dt_entrada: "", dt_saida: "", dt_ultima_movimentacao: "", ic_bezerro: false },
        options_animais: [],
        options_lotes: [],
      }
    },
    props: {
      data: { type: Object },
      disabled: { type: Boolean },
      disable_animaislotes: { type: Boolean }
    },
    watch: { 
      data: {
        handler() {
          this.form = this.data;
        },
        deep: true,
        immediate: true,
      }
    },
    emits: ["submit", "reset"],
    methods: {
      async onSubmit(event) {
        event.preventDefault();
        this.$emit('submit', this.form);
      },
      onReset(event) {
        event.preventDefault()
        this.$emit('reset', this.form);
      }
    },
    async beforeMount() {
      const lotes = await handleLote.index();  
      if(lotes instanceof Error) return;
      this.options_lotes = lotes;      

      const animais = await handleAnimal.index();  
      if(animais instanceof Error) return;
      this.options_animais = animais;
    }
  }
</script>

<style scoped>

</style>