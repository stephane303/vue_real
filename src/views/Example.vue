<template>
  <div>
    <input :class="{ error: $v.email.$error}" type="email" placeholder="What's your email" v-model="email" @blur="$v.email.$touch()" />
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">Please enter a valid email</p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>

    <button type="submit">Submit</button>
  </div>
</template>
    
    <script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>