<template>
  <div class="corpo container">
    <h1 class="centralizado">Discos disponíveis</h1>
    
    <div class="row">
      <div class="col-md-3" v-for="disc in discs">
        <div class="card" >
          <div class="card-body">
            <p>{{ disc.name }}</p>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-danger" @click="destroy(disc)">exclur</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  <CustomNotifications></CustomNotifications>
  </div>
</template>

<script>
import $ from "jquery";
import CustomNotifications from "../customNotification/CustomNotifications.vue";

export default {
  components: {
    CustomNotifications,
  },

  data() {
    return {
      discs: [],
      collectionId: this.$route.params.id
    }
  },

  created() {
    this.$http.get(`collectionDiscs/listDiscs/${this.collectionId}`)
      .then(res => res.json())
      .then(res => {
        this.discs = res

        if(res.length == 0) {
          this.$notify({
            group: "Warn",
            title: "Alerta!",
            type: "warn",
            text: "Não há discos a serem exibidos."
          });
        }
      })
  },

  methods: {
    destroy(disc) {
      this.$http.delete(`collectionDiscs/${this.collectionId}/${disc.id}`)
        .then(res => res.json())
        .then(res => {
          let indice = this.discs.indexOf(disc);
          this.discs.splice(indice, 1);
        })
    }
  }
}
</script>

<style scoped>
  .centralizado {
    text-align: center;
  }

  .corpo {
    width: 100%;
    margin: 0 auto;
  }

  .horizontal-list {
    display: inline-block;
  }

  .horizontal-colection {
    display: inline-block;
    float: right;
  }

  .horizontal-block {
    display: block;
    width: 100%;
  }

  .corpo{
    margin: 2em auto;
  }

</style>