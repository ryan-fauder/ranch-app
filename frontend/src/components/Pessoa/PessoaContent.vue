<template>

  <div id="content">
    <div>
      <b-row id="table-header" cols="3" align-h="end">
        <b-col>
          <h4>Registros - Pessoas</h4>
        </b-col>
        <b-col align-self="end">
          <b-button
          aria-controls="collapse-4"
          @click="[toggleModal(), setMode('create')]" variant="primary">Adicionar pessoa</b-button>
        </b-col>
      </b-row>

      <TableComponent @rowSelection="onPessoaSelection" :fields="table.fields" :items="table.items" />
    </div>
  </div>

  <b-modal v-model="showModal" :title="form_title" hide-footer>
    <div class="d-block text-left">
      <PessoaForm @submit="onSubmit" @reset="onReset" :data="mode == 'create' ? createPessoa : selectedPessoa" :disabled="mode == 'delete'">
      <b-form-group id="control-form">
        <b-button type="reset" :variant="controlButtons.reset.variant"> {{controlButtons.reset.text}}</b-button>
        <b-button type="submit" :variant="controlButtons.submit.variant"> {{controlButtons.submit.text}}</b-button>
      </b-form-group>
    </PessoaForm>
    </div>
  </b-modal>
</template>

<script>
  import PessoaForm from './PessoaForm.vue'
  import TableComponent from '../TableComponent.vue'
  import handlePessoa from '../../api/pessoa';

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
      PessoaForm,
      TableComponent
    },
    data: () => {
      return {
        showModal: false,
        mode: 'create',
        selectedPessoa: { id: -1, email: '', nome: '', endereco: '', sexo: '', ativo: 'false' },
        createPessoa: { id: -1, email: '', nome: '', endereco: '', sexo: '', ativo: 'false' },
        table: {
          fields: [
              'index',
              { key: 'nome', label: 'Nome', sortable: true },
              { key: 'email', label: 'E-mail', sortable: false },
              { key: 'endereco', label: 'Endereço', sortable: false },
              { key: 'sexo', label: 'Sexo', sortable: false },
              { key: 'ativo', label: 'Ativo', sortable: false },
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
      onPessoaSelection(index, pessoa, mode){
        this.selectedPessoa = {...pessoa};
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

        const items = await handlePessoa.index();  
        if(items instanceof Error) alert("Não foi possível se conectar ao banco de dados. Tente recarregar a página.");
        this.table.items = items;
      },
      onReset(form){
        if(this.mode == 'delete'){
          this.toggleModal();
          return;
        }
        form.email = ''
        form.nome = ''
        form.endereco = ''
        form.sexo = ''
        form.ativo = 'false'
      }
    },
    computed: {
      form_title(){
        return form_types[this.mode].title;
      },
      submitFunction(){
        return handlePessoa[this.mode];
      },
      controlButtons(){
        return form_types[this.mode].buttons
      }
    },
    async beforeMount() {
      const items = await handlePessoa.index();  
      if(items instanceof Error) alert("Não foi possível se conectar ao banco de dados. Tente recarregar a página.");
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

