<script setup lang="ts">
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import GalleryView from './views/GalleryView.vue'

onMounted(() => {
  const btnTheme = document.querySelector('.header__btn') as HTMLButtonElement
  const elemBody = document.body

  btnTheme.onclick = () => {
    elemBody.classList.toggle('dark-mode')
  }
})
</script>

<template>
  <div class="container">
    <Header />
    <GalleryView />
  </div>
</template>
