<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        @blur="$v.event.category.$touch()"
        label="Select a category"
        :options="categories"
        :class="{ error: $v.event.category.$error}"
        v-model="event.category"
      />
      <div v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Category is required.</p>
      </div>
      <h3>Name & describe your event</h3>
      <BaseInput
        @blur="$v.event.title.$touch()"
        class="field"
        placeholder="Title"
        type="text"
        label="Title"
        v-model="event.title"
        :class="{ error: $v.event.title.$error}"
      />
      <div v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Title is required.</p>
      </div>
      <BaseInput
        class="field"
        placeholder="Add a description"
        type="text"
        label="Description"
        v-model="event.description"
        :class="{ error: $v.event.description.$error}"
        @blur="$v.event.description.$touch()"
      />
      <div v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">Description is required.</p>
      </div>
      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        :class="{ error: $v.event.location.$error}"
        @blur="$v.event.location.$touch()"
      />
      <div v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Location is required.</p>
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          @opened="$v.event.date.$touch()"
          v-model="event.date"
          :class="{ error: $v.event.date.$error}"
          placeholder="Select a date"
        />
      </div>
      <div v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
      </div>
      <BaseSelect
        @blur="$v.event.time.$touch()"
        class="field"
        label="Select a time"
        :options="times"
        :class="{ error: $v.event.time.$error}"
        v-model="event.time"
      />
      <div v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Time is required.</p>
      </div>
      <BaseButton type="submit" classButton="-fill-gradient" :disable="$v.$anyError">Submit</BaseButton>
      <p v-if="$v.$anyError" class="errorMessage">Please fill out all the required fields</p>
    </form>
  </div>
</template>

 <script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'
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
      categories: this.$store.state.categories
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        NProgress.start()
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEvent()
          })
          .catch(() => {
            NProgress.done()
            console.log('Erreur de création')
          })
      }
    },
    createFreshEvent() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
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