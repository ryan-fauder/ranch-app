<template>

  <div id="content">
    <div>
      <b-row id="table-header" cols="3" align-h="end">
        <b-col>
          <h4>Registros - Animais</h4>
        </b-col>
        <b-col align-self="end">
          <b-button
          aria-controls="collapse-4"
          @click="[toggleModal(), setMode('create')]" variant="primary">Adicionar animal</b-button>
        </b-col>
      </b-row>

      <TableComponent @rowSelection="onAnimalSelection" :fields="table.fields" :items="table.items" />
    </div>
  </div>

  <b-modal v-model="showModal" :title="form_title" hide-footer>
    <div class="d-block text-left">
      <AnimalForm @submit="onSubmit" @reset="onReset" :data="mode == 'create' ? createAnimal : selectedAnimal" :disabled="mode == 'delete'">
      <b-form-group id="control-form">
        <b-button type="reset" :variant="controlButtons.reset.variant"> {{controlButtons.reset.text}}</b-button>
        <b-button type="submit" :variant="controlButtons.submit.variant"> {{controlButtons.submit.text}}</b-button>
      </b-form-group>
    </AnimalForm>
    </div>
  </b-modal>
</template>

<script>
  import AnimalForm from './AnimalForm.vue'
  import TableComponent from '../TableComponent.vue'
  import handleAnimal from '../../api/animal';
  import moment from "moment";

  const form_types = {
    create: {
      title: "Adicionar animal",
      buttons: {
        reset: { variant: "danger", text: "Limpar" },
        submit: { variant: "primary", text: "Adicionar" }
      }
    },
    update: {
      title: "Editar animal",
      buttons: {
        reset: { id: "reset-button", type_btn: "reset", variant: "danger", text: "Limpar" },
        submit: { id: "submit-button", type_btn: "submit", variant: "primary", text: "Atualizar" }
      }
    },
    delete: {
      title: "Remover animal",     
      buttons: {
        reset:  { id: "cancel-button", type_btn: "reset", variant: "secondary", text: "Cancelar" },
        submit: { id: "submit-button", type_btn: "submit", variant: "danger", text: "Remover" }
      }
    }
  };

  export default {
    name: 'AnimalContent',
    components: {
      AnimalForm,
      TableComponent
    },
    data: () => {
      return {
        showModal: false,
        mode: 'create',
        selectedAnimal: { id_fazenda: "", nome: "", raca: "", sexo: "", dt_nascimento: "" },
        createAnimal: { id_fazenda: "", nome: "", raca: "", sexo: "", dt_nascimento: "", fk_id_pessoa: null },
        table: {
          fields: [
              'index',
              { key: 'id_fazenda', label: 'ID Fazenda', sortable: true },
              { key: 'nome', label: 'Nome', sortable: false },
              { key: 'raca', label: 'Raça', sortable: false },
              { key: 'sexo', label: 'Sexo', sortable: false },
              { key: 'dt_nascimento', label: 'Data de Nascimento', sortable: false, formatter: (value) => moment(value).format("DD/MM/YYYY") },
              { key: 'pessoa', label: 'Proprietário', sortable: false, formatter: (value) => value?.name  },
              { key: 'actions', label: 'Ações', sortable: false },
            ],
          items: []
        }
      }
    },
    methods: {
      setMode(mode){
        this.mode = mode;
      },
      toggleModal(){
        this.showModal = !this.showModal;
      },
      onAnimalSelection(index, animal, mode){
        this.selectedAnimal = {...animal};
        this.toggleModal();
        this.setMode(mode);
      },
      async onSubmit(form){
        const response = await this.submitFunction(form);
        console.log(response);

        if(response instanceof Error || response.error){
          alert("Não foi possível realizar essa operação");
          return;
        }
        alert("Enviado com sucesso");

        const items = await handleAnimal.index();  
        if(items instanceof Error) return;
        this.table.items = items;
      },
      onReset(form){
        if(this.mode == 'delete'){
          this.toggleModal();
          return;
        }
        form.id_fazenda = ''
        form.nome = ''
        form.raca = ''
        form.sexo = ''
        form.dt_nascimento = ''
        form.fk_id_pessoa = null
      }
    },
    computed: {
      form_title(){
        return form_types[this.mode].title;
      },
      submitFunction(){
        return handleAnimal[this.mode];
      },
      controlButtons(){
        return form_types[this.mode].buttons
      }
    },
    async beforeMount() {
      const items = await handleAnimal.index();
      if(items instanceof Error) return;
      this.table.items = items;
    },
  }
</script>

<style scoped>
  #content{
    min-width: 60%;
  }
  #table-header {
    margin: 2rem 0 0.5rem 0;
  }
  #content > button{
    margin: 10px;
  }
  #card {
    padding: 20px;
    min-width: 400px;
  }
  #control-form button {
    margin: 0 0.2rem 0 0.2rem;
  }
  #control-form {
    text-align: right;
  }
</style>

