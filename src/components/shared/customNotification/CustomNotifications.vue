<template>
  <div>
      <notifications group="Warn"
      :duration="5000"
      :width="'auto'"
      animation-name="v-fade-right"
      position="top right"
      :max="1">
      <template slot="body" slot-scope="props" >
        <div>
          <b-alert variant="warning" dismissible
             show>
            {{props.item.text}}
          </b-alert>
        </div>
      </template>
    </notifications>
    
    <notifications group="Error"
      :duration="5000"
      :width="'auto'"
      animation-name="v-fade-right"
      position="top right"
      :max="1">
      <template slot="body" slot-scope="props">
        <div>
          <b-alert variant="danger" dismissible
             show>
            {{props.item.text}}
          </b-alert>
        </div>
      </template>
    </notifications>

    <notifications group="Success"
      :duration="5000"
      :width="'auto'"
      animation-name="v-fade-right"
      position="top right"
      :max="1">
      <template slot="body" slot-scope="props">
        <div>
          <b-alert variant="success" dismissible
             show>
            {{props.item.text}}
          </b-alert>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
export default {
  name: 'ClientComponent'
}
</script>

<style scoped>
.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all .5s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-500px) scale(0.2);
}
.vue-error-notification {
  padding: 10px;
  margin: 0 5px 5px;
 
  font-size: 16px;
 
  color: #ffffff;
  background: #E54D42;
  border-left-color: #B82E24;
 }
 .vue-warn-notification {
  padding: 10px;
  margin: 0 5px 5px;
 
  font-size: 19px;
  font-weight: bold;
 
  color: #ffffff;
  background: #e7b848;
  border-left-color: #f48a06;
 }
 .vue-success-notification {
  padding: 10px;
  margin: 0 5px 5px;
 
  font-size: 19px;
  font-weight: bold;
 
  color: #ffffff;
  background: #68CD86;
    border-left-color: #42A85F;
 }
 
 .alert-size {
  height: auto;
}
.notification-wrapper{
  padding: 65px 15px;
}

</style>
