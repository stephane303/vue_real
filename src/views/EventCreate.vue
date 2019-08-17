<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect label="Select a category" :options="categories" v-model="event.category"/>
      <h3>Name & describe your event</h3>
      <BaseInput  class="field" placeholder="Title" type="text" label='Title' v-model="event.title"/>      
      <BaseInput class="field" placeholder="Add a description" type="text" label="Description" v-model="event.description" />
      <h3>Where is your event?</h3>
      <BaseInput label="Location" v-model="event.location" type="text" placeholder="Add a location" />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <BaseSelect class="field" label="Select a time" :options="times"  v-model="event.time"/>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

 <script>
    import Datepicker from 'vuejs-datepicker'
    import NProgress from 'nprogress'
    export default {
      components: {
        Datepicker
      },
      data() {
        const times = []
        for (let i = 1; i <= 24; i++) {
          times.push(i + ':00')
        }
        return {
          event: this.createFreshEvent(),
          times,
          categories: this.$store.state.categories,
        }
      },
      methods: {
        createEvent() {
          NProgress.start();
          this.$store.dispatch('event/createEvent', this.event).then (()=>{
            this.$router.push ({
              name:'event-show',
              params:{id:this.event.id}
            })
            this.event = this.createFreshEvent()
          }).catch(() =>{
            NProgress.done();
            console.log('Erreur de création')
          })
        },
        createFreshEvent() {
          const user = this.$store.state.user.user
          const id = Math.floor(Math.random()* 10000000)
          return {
            id: id,
            category: 'food',
            organizer: user.name,
            title: '',
            description: '',
            location: '',
            date: '',
            time: '',
            attendees: []
          }
        }
      }
    }
    </script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>