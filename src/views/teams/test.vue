<template>
  <div>
    <multiselect
      v-model="selected"
      :options="options">
    </multiselect>
  </div>
</template>

<script>
  import Multiselect from '@vueform/multiselect'
  export default {
    components: { Multiselect },
    data () {
      return {
        selected: null,
        options: ['list', 'of', 'options']
      }
    }
  }
</script>
