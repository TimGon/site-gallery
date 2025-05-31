<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const emit = defineEmits(['search'])

const handleSearch = (event: Event) => {
  event.preventDefault()
  emit('search', searchQuery.value)
}
</script>

<template>
  <form class="main__search" @submit="handleSearch">
    <input
      class="main__search--inp"
      type="search"
      v-model="searchQuery"
      placeholder="Painting title"
      @input="$emit('search', searchQuery)"
    />
  </form>
</template>
