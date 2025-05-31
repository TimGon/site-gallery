<script setup lang="ts">
defineProps<{
  id: number
  name?: string
  location?: string
  imageUrl?: string
  workName?: string
  workYear?: string
}>()
</script>

<template>
  <div class="main__card">
    <div class="main__card--block">
      <img
        class="main__card--img"
        :src="'https://test-front.framework.team' + imageUrl"
        :alt="workName || 'Изображение картины'"
      />
      <div class="main__card--white">
        <div class="main__card--text">
          <div class="main__card--hidden">
            <h1 v-if="name && name?.length > 20" class="main__card--title">
              {{ name?.substring(0, 20) + '...' || 'Неизвестный художник' }}
            </h1>
            <h1 v-else class="main__card--title">
              {{ name || 'Неизвестный художник' }}
            </h1>
            <p class="main__card--dscr">{{ location || 'Местоположение неизвестно' }}</p>
          </div>
          <div class="main__card--active-info">
            <h1 v-if="workName && workName?.length > 22" class="main__card--title">
              {{ workName?.substring(0, 22) + '...' || 'Неизвестная работа' }}
            </h1>
            <h1 v-else class="main__card--title">
              {{ workName || 'Неизвестный художник' }}
            </h1>
            <p class="main__card--dscr">{{ workYear || 'Год неизвестен' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
