<template>

  <div id="content">
    <div>
      <b-row id="table-header" cols="3" align-h="end">
        <b-col>
          <h4>Registros - Lotes</h4>
        </b-col>
        <b-col align-self="end">
          <b-button
          aria-controls="collapse-4"
          @click="[toggleModal(), setMode('create')]" variant="primary">Adicionar lote</b-button>
        </b-col>
      </b-row>

      <TableComponent @rowSelection="onLoteSelection" :fields="table.fields" :items="table.items" />
    </div>
  </div>

  <b-modal v-model="showModal" :title="form_title" hide-footer>
    <div class="d-block text-left">
      <LoteForm @submit="onSubmit" @reset="onReset" :data="mode == 'create' ? createLote : selectedLote" :disabled="mode == 'delete'">
      <b-form-group id="control-form">
        <b-button type="reset" :variant="controlButtons.reset.variant"> {{controlButtons.reset.text}}</b-button>
        <b-button type="submit" :variant="controlButtons.submit.variant"> {{controlButtons.submit.text}}</b-button>
      </b-form-group>
    </LoteForm>
    </div>
  </b-modal>
</template>

<script>
  import LoteForm from './LoteForm.vue'
  import TableComponent from '../TableComponent.vue'
  import handleLote from '../../api/lote';

  const form_types = {
    create: {
      title: "Adicionar lote",
      buttons: {
        reset: { variant: "danger", text: "Limpar" },
        submit: { variant: "primary", text: "Adicionar" }
      }
    },
    update: {
      title: "Editar lote",
      buttons: {
        reset: { id: "reset-button", type_btn: "reset", variant: "danger", text: "Limpar" },
        submit: { id: "submit-button", type_btn: "submit", variant: "primary", text: "Atualizar" }
      }
    },
    delete: {
      title: "Remover lote",     
      buttons: {
        reset:  { id: "cancel-button", type_btn: "reset", variant: "secondary", text: "Cancelar" },
        submit: { id: "submit-button", type_btn: "submit", variant: "danger", text: "Remover" }
      }
    }
  };


  export default {
    name: 'LoteContent',
    components: {
      LoteForm,
      TableComponent
    },
    data: () => {
      return {
        showModal: false,
        mode: 'create',
        selectedLote: { id: -1, nome: '', descricao: '' },
        createLote: { id: -1, nome: '', descricao: '' },
        table: {
          fields: [
              'index',
              { key: 'nome', label: 'Nome', sortable: true },
              { key: 'descricao', label: 'Descrição', sortable: false },
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
      onLoteSelection(index, lote, mode){
        this.selectedLote = {...lote};
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
        const items = await handleLote.index();
        if(items instanceof Error) alert("Não foi possível se conectar ao banco de dados. Tente recarregar a página.");
        this.table.items = items;
      },
      onReset(form){
        if(this.mode == 'delete'){
          this.toggleModal();
          return;
        }
        form.nome = ''
        form.descricao = ''
      }
    },
    computed: {
      form_title(){
        return form_types[this.mode].title;
      },
      submitFunction(){
        return handleLote[this.mode];
      },
      controlButtons(){
        return form_types[this.mode].buttons
      }
    },
    async beforeMount() {
      const items = await handleLote.index();
      if(items instanceof Error) alert("Não foi possível se conectar ao banco de dados. Tente recarregar a página.");
      this.table.items = items;
    },
  }
</script>

<style scoped>
  #content{
    min-width: 50%;
  }
  #table-header {
    margin: 2rem 0 0.5rem 0;
  }
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

