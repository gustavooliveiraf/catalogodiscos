<template>
  <div class="container">
    <CustomNotifications></CustomNotifications>
    <h1 class="centralizado">Novo disco</h1>
    
    <form @submit.prevent="save()">

      <div class="controle form-group">
        <label for="titulo">Título</label>
        <input name="titulo" id="titulo" autocomplete="off" v-model="disc" class="form-control">
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
          disc: ''
      }
  },

  methods: {
      save() {
        if (this.disc) {
          this.$http.post('discs', {name: this.disc})
            .then(res => res.json())
            .then(res => {
              this.$notify({
                group: "Success",
                title: "Alerta!",
                type: "success",
                text: "Disco inserido com sucesso."
              });

              this.$router.push({ name: 'disc' })
            })
        } else {
          this.$notify({
            group: "Warn",
            title: "Alerta!",
            type: "warn",
            text: "O campo não pode ficar vazio."
          });
        }
      }
  },
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