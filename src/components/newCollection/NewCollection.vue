<template>
  <div class="container">
    <CustomNotifications></CustomNotifications>
    <h1 class="centralizado">Nova Coleção</h1>

    <h2 v-if="collection.id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Inserindo </h2>
    
    <form @submit.prevent="save()">

      <div class="controle form-group">
        <label for="titulo">Título</label>
        <input name="titulo" id="titulo" autocomplete="off" v-model="collection.name" class="form-control">
      </div>

      <div class="controle form-group">
        <label for="url">URL</label>
        <input name="url" id="url" autocomplete="off" v-model="collection.url" class="form-control">
        <img v-show="collection.url" :src="collection.url" :alt="collection.name"/>         
      </div>

      <div class="controle form-group">
        <label for="description">Descrição</label>
        <textarea id="description" autocomplete="off" v-model="collection.description" class="form-control">
        </textarea>
      </div>

      <div class="centralizado form-group">
        <router-link :to="{ name: 'home'}"><my-button tags="Voltar" styles="danger" type="button"/></router-link>
        <my-button tags="Gravar" styles="default" type="submit"/>
      </div>

    </form>
  </div>
</template>

<script>
import Button from '../shared/button/Button.vue';
import Collection from '../../domain/collection/Collection';
import CustomNotifications from "../shared/customNotification/CustomNotifications.vue";

export default {

  components: {
    'my-button': Button,
    CustomNotifications
  },

  data() {
      return {
          collection: new Collection(),
          id: this.$route.params.id
      }
  },

  methods: {
      save() {
        if (this.collection.name) {
          if(!this.collection.id) {
            this.$http.post('collections', this.collection)
              .then(res => res.json())
              .then(res => {
                this.$notify({
                  group: "Success",
                  title: "Alerta!",
                  type: "success",
                  text: "Coleção inserida com sucesso."
                });

                this.$router.push({ name: 'home' })
              })
          } else {
            this.$http.put('collections', this.collection)
              .then(res => res.json())
              .then(res => {
                this.$notify({
                  group: "Success",
                  title: "Alerta!",
                  type: "success",
                  text: "Coleção alterada com sucesso."
                });

                this.$router.push({ name: 'home' })
              })
          }
        } else {
          this.$notify({
            group: "Warn",
            title: "Alerta!",
            type: "warn",
            text: "Preencha pelo menos o campo Título."
          });
        }
      }
  },

  created() {
    if(this.id) {
      this.$http.get(`collections/getCollections/${this.id}`)
        .then(res => res.json())
        .then(res => this.collection = res)
    }
  }
}

</script>
<style scoped>
  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

  .erro {
    color: red;
  } 
</style>