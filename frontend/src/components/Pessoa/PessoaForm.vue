<template>
  <div>
    <b-form id="pessoa-form" @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-0" label="Nome:" label-for="input-0">
        <b-form-input 
          id="input-0" v-model="form.nome" placeholder="Insira o nome"
          required :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="Endereço de E-mail:" label-for="input-1">
        <b-form-input 
        id="input-1" v-model.lazy="form.email" type="email" 
        placeholder="Insira o endereço de e-mail" required :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Endereço:" label-for="input-3">
        <b-form-input 
        id="input-2" v-model.lazy="form.endereco" type="text" 
        placeholder="Insira o endereço" required :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Sexo">
        <b-form-radio-group id="radio-group-1" :disabled="disabled">
          <b-form-radio v-model="form.sexo" value="M">Masculino</b-form-radio>
          <b-form-radio v-model="form.sexo" value="F">Feminino</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <b-form-group id="input-group-4" label="Ativo">
        <b-form-radio-group id="radio-group-2" :disabled="disabled">
          <b-form-radio v-model="form.ativo" value="true">Ativo</b-form-radio>
          <b-form-radio v-model="form.ativo" value="false">Inativo</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <slot />

    </b-form>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        form: { id: -1, email: '', nome: '', endereco: '', sexo: '', ativo: 'false' },
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