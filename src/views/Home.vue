<template>
  <div class="home">
    <template>
      <loading-indicator />
    </template>
  </div>
</template>

<script>
import loadingIndicator from '@/components/loading-indicator'

export default {
  name: 'home',
  components: {
    loadingIndicator
  }
}
</script>
