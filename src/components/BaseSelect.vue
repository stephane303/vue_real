<template>
  <div>
      <label>{{label}}</label>
      <select :value="value" @input="updateValue" v-on="listeners">
        <option v-for="option in options" 
        :key="option"
         >{{ option }}</option>
      </select>    
  </div>
</template>

<script>
import  {formFieldMixin} from '../mixins/formFieldMixin'
export default {
  mixins :[formFieldMixin],
  props:{
    options :{
      type: Array,
      required: true
    }
  },
  computed: {
    listeners(){
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }

}
</script>
