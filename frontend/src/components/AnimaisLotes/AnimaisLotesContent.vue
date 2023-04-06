<template>

  <div id="content">
    <div>
      <b-row id="table-header" cols="3" align-h="end">
        <b-col>
          <h4>Registros - Relações</h4>
        </b-col>
        <b-col align-self="end">
          <b-button
          aria-controls="collapse-4"
          @click="[toggleModal(), setMode('create')]" variant="primary">Adicionar relação</b-button>
        </b-col>
      </b-row>

      <TableComponent @rowSelection="onPersonSelection" :fields="table.fields" :items="table.items" />
    </div>
  </div>

  <b-modal v-model="showModal" :title="form_title" hide-footer>
    <div class="d-block text-left">
      <AnimaisLotesForm @submit="onSubmit" @reset="onReset" :data="mode == 'create' ? createPerson : selectedPerson" :disabled="mode == 'delete'">
      <b-form-group id="control-form">
        <b-button type="reset" :variant="controlButtons.reset.variant"> {{controlButtons.reset.text}}</b-button>
        <b-button type="submit" :variant="controlButtons.submit.variant"> {{controlButtons.submit.text}}</b-button>
      </b-form-group>
    </AnimaisLotesForm>
    </div>
  </b-modal>
</template>

<script>
  import AnimaisLotesForm from './AnimaisLotesForm.vue'
  import TableComponent from '../TableComponent.vue'
  import handleAnimaisLotes from '../../api/animaislotes';

  const form_types = {
    create: {
      title: "Adicionar relação",
      buttons: {
        reset: { variant: "danger", text: "Limpar" },
        submit: { variant: "primary", text: "Adicionar" }
      }
    },
    update: {
      title: "Editar relação",
      buttons: {
        reset: { id: "reset-button", type_btn: "reset", variant: "danger", text: "Limpar" },
        submit: { id: "submit-button", type_btn: "submit", variant: "primary", text: "Atualizar" }
      }
    },
    delete: {
      title: "Remover relação",     
      buttons: {
        reset:  { id: "cancel-button", type_btn: "reset", variant: "secondary", text: "Cancelar" },
        submit: { id: "submit-button", type_btn: "submit", variant: "danger", text: "Remover" }
      }
    }
  };


  export default {
    name: 'PeopleContent',
    components: {
      AnimaisLotesForm,
      TableComponent
    },
    data: () => {
      return {
        showModal: false,
        mode: 'create',
        selectedPerson: { id: -1, email: '', name: '', address: '', gender: '', active: 'false' },
        createPerson: { id: -1, email: '', name: '', address: '', gender: '', active: 'false' },
        table: {
          fields: [
              'index',
              { key: 'fk_id_animal', label: 'ID Animal', sortable: true },
              { key: 'animal', label: 'Nome (Animal)', sortable: false, formatter: (value) => value?.nome },
              { key: 'fk_id_lote', label: 'ID lote', sortable: false },
              { key: "lote", label: 'Nome (Lote)', sortable: false, formatter: (value) => value?.nome },
              { key: 'dt_entrada', label: 'Data de Entrada', sortable: false },
              { key: 'dt_saida', label: 'Data de Saída', sortable: false },
              { key: 'dt_ultima_movimentacao', label: 'Data de Ultima Movimentação', sortable: false },
              { key: 'ic_bezerro', label: 'IC Bezerro', sortable: false },
              { key: 'actions', label: 'Ações', sortable: false },
            ],
          items: [
              { id: -1 , fk_id_animal: -1, fk_id_lote: -1, dt_entrada: "06/04/2022", dt_saida: "10/04/2023", dt_ultima_movimentacao: "10/04/2023", ic_bezerro: "true" },
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

        const items = await handleAnimaisLotes.index();  
        if(items instanceof Error) return;
        this.table.items = items;
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
        form.active = 'false'
      }
    },
    computed: {
      form_title(){
        return form_types[this.mode].title;
      },
      submitFunction(){
        return handleAnimaisLotes[this.mode];
      },
      controlButtons(){
        return form_types[this.mode].buttons
      }
    },
    async beforeMount() {
      const items = await handleAnimaisLotes.index();  
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

