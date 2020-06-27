<template>
  <div></div>
</template>

<script>
import draggable from 'vuedraggable'
import color from './common/Color'
import controlsForm from './common/ControlsForm'
import loading from './common/Loading'

export default {
  name: 'Index',
  components: {
    draggable,
    color,
    loading,
    'controls-form': controlsForm
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
</style>
