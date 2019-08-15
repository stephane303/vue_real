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

import EventCard from '@/components/EventCard.vue';
import {mapState} from 'vuex'
export default {
  components : {
    EventCard
  },
  created (){
    this.perPage = 2 // Setting perPage here and not in data means it won't be reactive.
    // We don't need it to be reactive, and this way our component has access to it.    
    this.$store.dispatch('event/fetchEvents',
    {
      perPage :this.perPage,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) ||1
    },
    showNextPage(){
      return this.page < (this.event.totalEvents / this.perPage);
    },
    ...mapState(['event','user'])
  }
  
}
</script>