<template>
  <div>
    <b-form id="lote-form" @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Nome:" labelfor="input-1">
        <b-form-input
          id="input-1"
          v-model="form.nome"
          placeholder="Insira o nome"
          required
          :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Descrição:"
        label-for="input-2"
      >
        <b-form-textarea
          id="input-2"
          v-model.lazy="form.descricao"
          placeholder="Insira sua descrição"
          rows="3"
          max-rows="6"
          required
          :disabled="disabled"
        ></b-form-textarea>
      </b-form-group>

      <slot />

    </b-form>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        form: { id: -1, nome: '', descricao: ''},
      }
    },
    props: {
      data: { type: Object },
      disabled:{ type: Boolean },
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
    }
  }
</script>

<style scoped>

</style>