<template>
  <div>
  <h1>Events for {{user.user.name}}</h1>
  <EventCard :key='event.id' v-for="event in event.events" :event='event' />
  
  <router-link  v-if="page>1" :to="{ name:'event-list', query: {page: page-1}}" rel="prev">Prev Page </router-link> 
  <span v-if="page>1 && showNextPage"> | </span>
  <router-link  v-if="showNextPage" :to="{ name:'event-list', query: {page: page+1}}" rel="next">Next Page</router-link>

  </div>
</template>


<script>

function fetchPageEvents(routeTo, next){
  let page = routeTo.query.page || 1;
  console.log('page'+page)
  store.dispatch('event/fetchEvents', page).then(() => {
    routeTo.params.page = page;
    next();
    });
}

import EventCard from '@/components/EventCard.vue';
import {mapState} from 'vuex'
import store from '@/store/store'
export default {
  components : {
    EventCard
  },
  props :{
    page: Number
  },
  beforeRouteEnter(routeTo, routeFrom,next){
    console.log('beforeRouteEnter:'+ routeTo.query.page);
    fetchPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom,next){
    console.log('beforeRouteUpdate');
    fetchPageEvents(routeTo, next);
  },
  beforeRouteLeave(routeTo, routeFrom,next){
    console.log('beforeRouteLeave');
    next();
  },    
  computed: {
    showNextPage(){
      return this.page < (this.event.totalEvents / this.event.perPage);
    },
    ...mapState(['event','user'])
  }
  
}
</script>