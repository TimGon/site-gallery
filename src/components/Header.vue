<script setup lang="ts">
import ThemeBtn from './ThemeBtn.vue'
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <img class="header__logo--dark" src="../assets/img/logo_dark.svg" alt="logo" />
      <img class="header__logo--white" src="../assets/img/logo_white.svg" alt="logo" />
    </div>
    <div class="header__block--btn">
      <ThemeBtn />
    </div>
  </header>
</template>
