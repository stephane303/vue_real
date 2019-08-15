<template>
  <div class="notification-bar" :class="notificationTypeClass">
  <p>{{ notification.message}}</p>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
import { setTimeout } from 'timers';
export default {
  props: {
    notification: {
      type:Object,
      require:true
    }
  },
  data (){
    return {
      timeout: null
    }
  },
  mounted(){
    this.timeout = setTimeout(() => this.remove(this.notification),5000)
  },
  beforeDestroy(){
    clearTimeout(this.timeout)
  },
  computed:{
    notificationTypeClass(){
      return `-text-${this.notification.type}`
    }
  },
  methods:mapActions('notification', ['remove'])
  
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
  padding: 10px; 
  border: 1px solid;
  box-shadow: 2px 2px 2px
}

</style>