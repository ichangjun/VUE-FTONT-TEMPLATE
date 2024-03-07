<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <pins-component :id="$route.params.id" />
  </div>
</template>

<script lang="js" setup>
import PinsComponent from './components/pins.vue'
</script>
