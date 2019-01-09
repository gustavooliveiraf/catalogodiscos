<template>
  <div class="container">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <CustomNotifications></CustomNotifications>
    <h1 class="centralizado">Nova Coleção</h1>

    <h2 v-if="collection.id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Inserindo </h2>
    
    <form @submit.prevent="save()">

      <div class="controle form-group">
        <label for="titulo">Título</label>
        <input name="titulo" id="titulo" autocomplete="off" v-model="collection.name" class="form-control">
      </div>

      <input 
      style="display: none"
      type="file" 
      @change="onFileChanged"
      ref="fileInput"
      >
      <button type="button" @click="$refs.fileInput.click()" class="btn btn-primary"><i class="fas fa-file-image"></i> Enviar Imagem</button>
    
      <div class="controle form-group" v-if="this.img.length != 0">
        <img :src="this.img" width="100px" height="100px" class="img">
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
          id: this.$route.params.id,
          selectedFile: null,
          img: ""
      }
  },

  methods: {
      save() {
        if (this.collection.name) {
          if(!this.collection.id) {
            const formData = new FormData()
            formData.append('image', this.selectedFile, this.selectedFile.name)
            formData.append('collection', JSON.stringify(this.collection))

            this.$http.post('collections', formData)
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
            const formData = new FormData()
            formData.append('image', this.selectedFile, this.selectedFile.name)
            formData.append('collection', JSON.stringify(this.collection))

            this.$http.put('collections', formData)
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
      },

      onFileChanged (event) {
        this.selectedFile = event.target.files[0]
        this.img = URL.createObjectURL(this.selectedFile)
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
  .img{
    margin-top: 20px;
    border-radius: 50%;
  }
</style>