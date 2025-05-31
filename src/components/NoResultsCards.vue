<script setup lang="ts">
defineProps({
  query: { type: String, required: true },
})
</script>

<template>
  <div class="main__result">
    <h3 class="main__result--not-found">
      No matches for <span class="main__result--inp">{{ query }}</span>
    </h3>
    <p class="main__result--again-info">Please try again with a different spelling or keywords.</p>
  </div>
</template>
