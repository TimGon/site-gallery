<script setup lang="ts">
defineProps({
  message: { type: String, required: true },
})
</script>

<template>
  <div class="main__error">{{ message }}</div>
</template>
