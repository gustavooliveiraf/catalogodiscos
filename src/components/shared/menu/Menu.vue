<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Catálogo de discos</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li v-for="rota in rotas" class="nav-item">
          <router-link :to="rota.path ? rota.path : '/'" class="nav-link">
            {{ rota.titulo }}
          </router-link>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script>

export default {

    props: {

        rotas: {
            type: Array,
            required: true
        }
    }
}

</script>

<style>
</style>