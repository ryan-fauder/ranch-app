<template>
  <div>
    <b-form id="people-form" @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Insira o nome"
          required
          :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Endereço de E-mail:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model.lazy="form.email"
          type="email"
          placeholder="Insira o endereço de e-mail"
          required
          :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Endereço:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model.lazy="form.address"
          type="text"
          placeholder="Insira o endereço"
          required
          :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Sexo">
        <b-form-radio-group id="radio-group" name="radio-group-1" :disabled="disabled">
          <b-form-radio v-model="form.gender" value="M">Masculino</b-form-radio>
          <b-form-radio v-model="form.gender" value="F">Feminino</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group id="input-group-4" label="Ativo">
        <b-form-radio-group id="radio-group-2" name="radio-group-2" :disabled="disabled">
          <b-form-radio v-model="form.active" value="true">Ativo</b-form-radio>
          <b-form-radio v-model="form.active" value="false">Inativo</b-form-radio>
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
        form: { id: -1, email: '', name: '', address: '', gender: '', active: '' },
      }
    },
    props: {
      person: {
        type: Object,
        default(){
          return { id: -1, email: '', name: '', address: '', gender: '', active: '' }
        }
      },
      disabled:{ type: Boolean },
    },
    watch: { 
      person: {
        handler() {
          this.form = this.person;
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