

<template>
  <div class=" flex flex-col min-h-screen">
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>
<style scoped></style>
