<template>
  <div id="table-component">
    <b-table id="content-table"
      :items="items" :fields="fields"
      :current-page="currentPage" :per-page="perPage"
      hover bordered medium responsive="sm"
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(actions)="data">
        <div class="action-group">
          <BIconTrashFill class="medium-size-icon" margin="1rem" @click="handleModal(data.index, data.item, 'delete')"/>
        </div>
        <div class="action-group">
          <BIconPencilFill class="medium-size-icon" margin="1rem" @click="handleModal(data.index, data.item, 'update')"/>  
        </div>
      </template>

    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="content-table"
      id="pagination-control"
    ></b-pagination>
  </div>
</template>


<script>
import { BIconTrashFill, BIconPencilFill } from 'bootstrap-icons-vue';

export default {
  name: 'TableComponent',
  components: {
    BIconTrashFill,
    BIconPencilFill,
  },
  emits: ["rowSelection"],
  props: {
    fields: Array,
    items: Array
  },
  data: () => {
    return {
      perPage: 10,
      currentPage: 1,
    }
  },
  compatConfig: { MODE: 3 },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    handleModal(index, data, mode){
      this.$emit('rowSelection', index, data, mode);
    },
  },
}
</script>

<style type="text/css" scoped>
  .action-group{
    display: inline;
    margin: 0 0.8rem 0 .5rem;
  }
  .action-group:hover{
    cursor: pointer;
  }
  #input-group-1{
    text-align: right;
  }
  #input-group-1 button{
    margin: .2rem;
  }
  #table-component{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 1.5rem;
  }
  .medium-size-icon {
    height: 1.5rem;
    width: 1.5rem;
  }

</style>