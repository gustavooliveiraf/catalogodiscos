<template>
  <div class="container">
  <h1 class="centralizado">Coleções</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <div class="card-columns">
      <div class="card mb-3 img" v-for="collection in collections">
        <img class="card-img-top pointer img" @click="listDisc(collection.id)" :src="collection.url" :alt="collection.name">
        <div class="card-body">
          <h5 class="card-title pointer" @click="listDisc(collection.id)">{{ collection.name }}</h5>
          <p class="card-text pointer" @click="listDisc(collection.id)">{{ collection.description }}</p>
          <div class="btn-group" role="group" aria-label="Basic example">
              
              <router-link :to="{ name : 'changeCollection', params: { id: collection.id} }">
                <my-button type="button" tags="Alterar"/>
              </router-link>
              <my-button
                type="button" 
                tags="Remover" 
                @botaoAtivado="remove(collection)"
                :check="true"
                styles="danger"/>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'collection'}"> <button type="button" data-toggle="tooltip" data-placement="left" title="Add nova coleção" class="btn btn-primary btn-lg add-buttom" > + </button> </router-link>
  </div>
</template>

<script>
import Button from '../shared/button/Button.vue';

export default {

  components: {
    'my-button' : Button
  },

  data() {

    return {
      collections: [], 
      filtro: '',
      mensagem: ''
    }
  },

  methods: {
    remove(collection) {
      this.$http.delete(`collections/${collection.id}`)
        .then(res => res.json())
        .then(res => {
          let indice = this.collections.indexOf(collection);
          this.collections.splice(indice, 1);
        })
    },

    listDisc(id) {
      this.$router.push({ name: 'discCollection', params: { id: id} });
    }
  },

  created() {
    this.$http.get('collections')
      .then(res => res.json())
      .then(res => this.collections = res)
  },
}

</script>

<style>
  .centralizado {

    text-align: center;
  }

  .filtro {

    display: block;
    width: 100%;
  }

  .imagem-responsiva {

    width: 100%;
  }

  .container{
    margin: 2em auto;
  }
  .card-columns{
    text-align: center;
    margin-top: 2em;
  }
  .card img{
    
    max-height: 200px;
    width: auto;
    margin: 5px auto 0 auto;
  }

  .card h5, .card p{
    text-align: left;
  }

  .card-text{
    min-height: 72px;
  }

  .pointer {
    cursor: pointer;
  }

  .card:hover {
    transform: scale(1.025)
  }

  .card {
    transition: 0.25s;
    animation: all ease-in-out 0.5s;
  }

  .add-buttom{
    position: fixed;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }

  .img{
    border-radius: 20px;
  }
</style>
