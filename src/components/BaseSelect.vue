<template>
  <div>
      <label>{{label}}</label>
      <select :value="value" @input="selectValue">
        <option v-for="option in options" 
        :key="option"
         >{{ option }}</option>
      </select>    
  </div>
</template>

<script>
export default {
  props:{
    label:{
      type: String,
      required : true
    },
    options :{
      type: Array,
      required: true
    },
    value : String
  },
  methods :{
    selectValue(event){
      console.log(event.target.value)
      this.$emit('input',event.target.value)
    }
  }

}
</script>

<style>

</style>