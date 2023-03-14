<template>
  <div>
    <b-navbar fill toggleable="lg" type="dark" class="navbar" >
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="handleClick" :active="currentContent == 'Pessoas'" name='Pessoas'>Pessoas</b-nav-item>
          <b-nav-item @click="handleClick" :active="currentContent == 'Animais'"  name='Animais'>Animais</b-nav-item>
          <b-nav-item @click="handleClick" :active="currentContent == 'Lotes'"  name='Lotes'>Lotes</b-nav-item>
          <b-nav-item @click="handleClick" :active="currentContent == 'Relações'"  name='Relações'>Relações</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      currentContent: 'Pessoas'
    }
  },
  methods: {
    handleClick($event) {
      this.currentContent = $event.target.textContent;
      this.$emit('changeContent', this.currentContent);
    }
  }
}
</script>

<style>
.navbar {
  background-color: #8ca615;
}
</style>