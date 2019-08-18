<template>
  <div>
    <label v-if="label">{{label}}</label>
    <input :value="value" v-on="listeners" @input="updateValue" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.updateValue }
    }
  },
  methods: {
    updateValue(event) {
      console.log(event.target.value)
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style>
</style>