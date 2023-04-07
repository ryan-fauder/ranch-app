<template>
  <div>
    <b-form id="animal-form" @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-0" label="ID da Fazenda:" label-for="input-0">
        <b-form-input
          id="input-0"
          v-model="form.id_fazenda"
          placeholder="Insira o ID da Fazenda"
          required
          :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.nome"
          placeholder="Insira o nome"
          required
          :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Raça:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.raca"
          placeholder="Insira a raça"
          required
          :disabled="disabled"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Data de Nascimento:" label-for="input-3">
        <VueDatePicker v-model="form.dt_nascimento" auto-apply 
        :close-on-auto-apply="false" :enable-time-picker="false" required :disabled="disabled" 
        format="dd/MM/yyyy" timezone="UTC"
        placeholder="Insira a data de nascimento"
        />
      </b-form-group>

      <b-form-group id="input-group-4" label="Proprietário">
        <b-form-select 
          v-model="form.fk_id_pessoa" :disabled="disabled"
          id="input-4" 
        >
          <option :value="null" disabled>Selecione um proprietário</option>
          <label>ID - Nome</label>
          <option v-for="option in options" :value="option.id" :key="option.id">
             {{ option.id }} - {{ option.name  }}
          </option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="Sexo">
        <b-form-radio-group id="radio-group" :disabled="disabled">
          <b-form-radio v-model="form.sexo" value="M">Masculino</b-form-radio>
          <b-form-radio v-model="form.sexo" value="F">Feminino</b-form-radio>
        </b-form-radio-group>
      </b-form-group>

      <slot />

    </b-form>
  </div>
</template>
<script>

  import handlePerson from '../../api/person';
  export default {
    data() {
      return {
        form: { id: -1, id_fazenda: '', nome: '', raca: '', dt_nascimento: '', sexo: '', fk_id_pessoa: 0 },
        options: [],
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
      },
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
    async beforeMount(){
      const items = await handlePerson.index();
      if(items instanceof Error) return;
      this.options = items;
    }
  }
</script>

<style scoped>

</style>