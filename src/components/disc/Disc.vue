<template>
  <div class="corpo container">
    <h1 class="centralizado">Discos disponíveis</h1>

    <div class="wrapp-filter">
      <input type="search" class="filter form-control" @input="filterVar = $event.target.value" placeholder="filtre por parte do nome">
    </div>

    <div class="row">
      <div class="col-md-4" v-for="discTemp in filter">
        <div class="card">
          <div class="card-body">
            <p>{{ discTemp.name }}</p>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary" @click="modal(discTemp.id+'-1')"> + coleção</button>
              <button type="button" class="btn btn-primary" @click="modal(discTemp.id+'-2')">editar</button>
              <button type="button" class="btn btn-danger" @click="modal(discTemp.id+'-3')">excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="collectionModal" tabindex="-1" role="dialog" aria-labelledby="collectionModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title" id="collectionModalLabel">Selecione as Coleções</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <table id="customers" class="tabelaE">
                <tr v-for="collection in collections">

                  <td> {{collection.name}} </td>

                  <td> <input type="checkbox" v-model="selectedCollectionsSave" :value="collection.id" name="collectionId" :disabled="validDesabled(collection.id)"> </td>

                  <div v-show="validDesabled(collection.id)">
                    Já está na coleção
                  </div>

                </tr>
              </table>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="save()">Salvar</button>
            </div>

        </div>
      </div>
    </div>

    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">

            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Editar informação do disco</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <input v-model="discName" type="text" class="form-control" id="namedisco" placeholder="Novo nome do disco" required>
              </div>
              </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="update()">Salvar</button>
            </div>

        </div>
      </div>
    </div>
    <router-link :to="{ name: 'newdisc'}"> <button type="button" data-toggle="tooltip" data-placement="left" title="Add novo disco" class="btn btn-primary btn-lg add-buttom" > + </button> </router-link>    
    
    <CustomNotifications></CustomNotifications>
  </div>
</template>

<script>
import $ from "jquery";
import CustomNotifications from "../shared/customNotification/CustomNotifications.vue";

export default {
  components: {
    CustomNotifications,
  },

  data() {
    return {
      discs: [],
      collections: [],
      selectedDisc: '',
      selectedCollections: [],
      selectedCollectionsSave: [],
      disc: '',
      option: '',
      discName: '',
      filterVar: ''
    }
  },

  created() {
    this.$http.get('discs')
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

    this.$http.get('collections')
      .then(res => res.json())
      .then(res => this.collections = res)
  },

  computed: {
    filter() {
      if(this.filterVar) {
        let exp = new RegExp(this.filterVar.trim(), 'i');
        return this.discs.filter(disc => exp.test(disc.name));
      } else {
        return this.discs;
      }
    }
  },

  methods: {
    modal(discAndOption) {
      [this.disc, this.option] = discAndOption.split('-')

      if (this.option == 1) {
        this.$http.get(`collectionDiscs/listCollections/${this.disc}`)
          .then(res => res.json())
          .then(res => {
            this.selectedCollections = res.map(a => a.collectionId)
            $("#collectionModal").modal("show");
         })
      } else if (this.option == 2) {
        this.discName = this.discs.find(element => element.id == this.disc).name
        $("#editModal").modal("show");
      } else if (this.option == 3) {
        var elementTemp = {}
        this.discs = this.discs.map(element => {
          if (element.id == this.disc) {
            elementTemp = element
          }
          return element
        })
        let indice = this.discs.indexOf(elementTemp);
        this.discs.splice(indice, 1);

        this.$http.delete(`discs/${this.disc}`)
          .then(res => res.json())
          .then(res => {
            this.$notify({
              group: "Success",
              title: "Alerta!",
              type: "success",
              text: "Disco excluído com sucesso."
            });
          })
      }
    },

    save() {
      if (this.selectedCollectionsSave.length > 0) {
        this.$http.post(`collectionDiscs/${this.disc}`, {collectionId: this.selectedCollectionsSave})
          .then(res => res.json())
          .then(res => {
            this.$notify({
              group: "Success",
              title: "Alerta!",
              type: "success",
              text: "Disco inserido com sucesso."
            });
          })
      } else {
        this.$notify({
          group: "Success",
          title: "Alerta!",
          type: "success",
          text: "Nenhuma alteração."
        });
      }
    },

    update() {
      this.$http.put(`discs/${this.disc}`, {name: this.discName})
        .then(res => res.json())
        .then(res => {
          this.discs = this.discs.map(element => {
            if (element.id == this.disc) {
              element.name = this.discName
            }

            return element
          })
            
          this.$notify({
            group: "Success",
            title: "Alerta!",
            type: "success",
            text: "Disco editado com sucesso."
          });
        })
    },

    validDesabled(collectionId) {
      for(var i in this.selectedCollections){
        if(this.selectedCollections[i] == collectionId){
          return true
        }        
      }
      return false;
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
    margin: 2em auto;
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
  h1{
    margin-bottom: 25px;
  }
  .filter {
    width: 45%;
    margin: 2em auto;
    float: left;
  }
  .card {
    margin-top: 20px;
  }
  .wrapp-filter{
    width: 100%;
    overflow: hidden;
  }
  .form-group{
    margin-top: 2em;
  }

  .add-buttom{
    position: fixed;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }

  @media(max-width: 800px){
    .filter{
      width: 100%;
    }
  }


</style>