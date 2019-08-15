import EventService from '@/services/EventService.js'

export const namespaced = true
export const   state = {
    events : [],
    totalEvents: 0,
    event:{}
  };

export const  mutations= {
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
  };
  
  export const actions = {
    createEvent({commit, dispatch}, event){
      return EventService.postEvent(event).then(() =>{
        commit('ADD_EVENT', event);
        const notification = {
          type:'success',
          message: 'Your event has been created!'
        };
        dispatch('notification/add', notification, {root:true});

      }).catch(error =>{
        const notification = {
          type:'error',
          message: 'There was a problem saving the created event: '+ error.message
        };
        dispatch('notification/add', notification, {root:true});
        throw error;
      })

    },
    fetchEvents({commit, dispatch}, {perPage, page}){
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
        const notification = {
          type:'error',
          message: 'There was a problem fetching events: '+ error.message
        };
        dispatch('notification/add', notification, {root:true});

      })      
    },
    fetchEvent({commit} ,id ){
      console.log('fetch event id '+ id);
      EventService.getEvent( id)
      .then( response => {
        commit('SET_EVENT',response.data);
        console.log(response.data);
      })
      .catch(error => {
        const notification = {
          type:'error',
          message: 'There was a problem fetching events: '+ error.message
        };
        dispatch('notification/add', notification, {root:true});
      })      
    }      
  };


