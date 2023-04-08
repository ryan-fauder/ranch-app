<template>
  <div>
    <b-navbar fill type="dark" class="navbar" >
      <b-navbar-brand href="#"><img src="../assets/logo.png" alt="logo" id="logo-img"></b-navbar-brand>

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
  width: 100%;
}

#logo-img {
  width: 2.4rem;
  height: 2.4rem;
}
</style>