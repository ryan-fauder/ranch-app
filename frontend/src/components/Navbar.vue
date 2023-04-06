<template>
  <div>
    <b-navbar fill toggleable="lg" type="dark" class="navbar" >
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="nav-item" to="/">Pessoas</b-nav-item>
          <b-nav-item class="nav-item" to="/animal">Animais</b-nav-item>
          <b-nav-item class="nav-item" to="/lote">Lotes</b-nav-item>
          <b-nav-item class="nav-item" to="/relacao">Relações</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style>

.navbar {
  background-color: #8ca615;
}


</style>