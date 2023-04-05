<template>

  <div class="content">
    <div>
      <b-row cols="3" align-h="end">
        <b-col>
          <h3>Registros</h3>
        </b-col>
        <b-col align-self="end">
          <b-button
          aria-controls="collapse-4"
          @click="[toggleModal(), setMode('create')]" variant="primary">Adicionar Pessoa</b-button>
        </b-col>
      </b-row>

      <TableComponent @rowSelection="onPersonSelection" :fields="table.fields" :items="table.items" />
    </div>
  </div>

  <b-modal v-model="showModal" :title="form_title" hide-footer>
    <div class="d-block text-left">
      <PeopleForm @submit="onSubmit" @reset="onReset" :person="selectedPerson" :disabled="mode == 'delete'">

      <b-form-group id="control-form">
        <b-button type="reset" :variant="controlButtons.reset.variant"> {{controlButtons.reset.text}}</b-button>
        <b-button type="submit" :variant="controlButtons.submit.variant"> {{controlButtons.submit.text}}</b-button>
      </b-form-group>
    </PeopleForm>
    </div>
  </b-modal>
</template>

<script>
  import PeopleForm from './PeopleForm.vue'
  import TableComponent from '../TableComponent.vue'
  import handlePerson from '../../api/person';

  const form_types = {
    create: {
      title: "Adicionar pessoa",
      buttons: {
        reset: { variant: "danger", text: "Limpar" },
        submit: { variant: "primary", text: "Adicionar" }
      }
    },
    update: {
      title: "Editar pessoa",
      buttons: {
        reset: { id: "reset-button", type_btn: "reset", variant: "danger", text: "Limpar" },
        submit: { id: "submit-button", type_btn: "submit", variant: "primary", text: "Atualizar" }
      }
    },
    delete: {
      title: "Remover pessoa",     
      buttons: {
        reset:  { id: "cancel-button", type_btn: "reset", variant: "secondary", text: "Cancelar" },
        submit: { id: "submit-button", type_btn: "submit", variant: "danger", text: "Remover" }
      }
    }
  };


  export default {
    name: 'PeopleContent',
    components: {
      PeopleForm,
      TableComponent
    },
    data: () => {
      return {
        showModal: false,
        mode: 'create',
        selectedPerson: { id: -1, email: '', name: '', address: '', gender: '', active: '' },
        table: {
          fields: [
              'index',
              { key: 'name', label: 'Nome', sortable: true },
              { key: 'email', label: 'E-mail', sortable: false },
              { key: 'address', label: 'Endereço', sortable: false },
              { key: 'gender', label: 'Sexo', sortable: false },
              { key: 'active', label: 'Ativo', sortable: false },
              { key: 'actions', label: 'Ações', sortable: false },
            ],
          items: [
              { isActive: true, name: "Jorge", email: 'jorge.mc@gmail.com', address: 'Rua BH', gender: 'M', actived: true },
              { isActive: false, name: "Andressa", email: 'andressa.mc@gmail.com', address: 'Rua SP', gender: 'F', actived: true },
              { isActive: false, name: "Augusto", email: 'guto.feliz@gmail.com', address: 'Rua RJ', gender: 'M', actived: false },
            ]
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
      onPersonSelection(index, person, mode){
        this.selectedPerson = {...person};
        this.toggleModal();
        this.setMode(mode);
      },
      async onSubmit(form){
        const response = await this.submitFunction(form);

        if(response instanceof Error || response.error){
          alert("Não foi possível realizar essa operação");
          return;
        }
        alert("Enviado com sucesso");
        const items = this.table.items;
        if(this.mode == 'create'){
          this.table.items = [...items, response];
        } 
        else if(this.mode == 'update'){
          this.table.items = items.map( item => (item.id == response.id) ? response : item)
        }
        else if(this.mode == 'delete'){
           this.table.items = items.filter(item => item.id !== response.id);
        }
      },
      onReset(form){
        if(this.mode == 'delete'){
          this.toggleModal();
          return;
        }
        form.email = ''
        form.name = ''
        form.address = ''
        form.gender = ''
      }
    },
    computed: {
      form_title(){
        return form_types[this.mode].title;
      },
      submitFunction(){
        return handlePerson[this.mode];
      },
      controlButtons(){
        return form_types[this.mode].buttons
      }
    },
    async beforeMount() {
      const items = await handlePerson.index();  
      if(items instanceof Error) return;
      this.table.items = items;
    },
  }
</script>

<style scoped>
  h3 {
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

