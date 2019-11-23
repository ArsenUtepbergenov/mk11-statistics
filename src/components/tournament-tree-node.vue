<template>
  <div class="tournament-tree-node">
    <span :class="_style">{{_text}}</span>
  </div>
</template>

<script>
export default {
  name: 'tournament-tree-node',
  props: {
    _text: {
      type: String,
      default: ''
    },
    _style: {
      type: String,
      default: ''
    }
  }
}
</script>
