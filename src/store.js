import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {id:'abc123', name:'Adam Jahr'},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events : [],
    totalEvents: 0,
    event:{}
  },
  mutations: {
    ADD_EVENT(state, event){
      state.events.push(event)
    },
    SET_EVENTS(state, {events, totalEvents}) {
      state.events = events;
      state.totalEvents = totalEvents;
    },
    SET_EVENT(state, event){
      state.event = event
    }
  },
  actions: {
    createEvent({commit}, event){
      return EventService.postEvent(event).then(() =>{
        commit('ADD_EVENT', event)
      })

    },
    fetchEvents({commit}, {perPage, page}){
      EventService.getEvents(perPage, page)
      .then(response => {
        console.log(response.headers['x-total-count']);
        console.log(response.data);
        commit('SET_EVENTS', 
        {
          events: response.data,
          totalEvents : response.headers['x-total-count']
        });
      }
      ).catch(error => {
        console.log('There was an error:'+error.response);
      })      
    },
    fetchEvent({commit} ,id ){
      console.log('fetch event id '+ id);
      EventService.getEvent( id)
      .then( response => {
        commit('SET_EVENT',response.data);
        console.log(response.data);
      });
    }      
  },
  getters: {
    catLength: state => {
       return state.categories.length
    }
  }
})
