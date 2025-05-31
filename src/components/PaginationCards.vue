<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  isDarkMode: { type: Boolean, default: false },
})

const emit = defineEmits(['page-change'])
// Отображение страниц
const visiblePages = computed(() => {
  const pages = []
  const { currentPage: current, totalPages: total } = props

  pages.push(1)

  if (total <= 5) {
    for (let i = 2; i <= total - 1; i++) {
      pages.push(i)
    }
  } else {
    const isNearStart = current <= 3
    const isNearEnd = current >= total - 2
    const isInMiddle = !isNearStart && !isNearEnd

    if (isNearStart) {
      pages.push(2, 3)
      if (current === 3) pages.push(4)
      if (total > 4) pages.push('...')
    }

    if (isNearEnd) {
      if (total > 4) pages.push('...')
      if (current === 4) pages.push(3)
      pages.push(total - 2, total - 1)
    }

    if (isInMiddle) {
      if (current > 4) pages.push('...')
      pages.push(current - 1, current, current + 1)
      if (current < total - 3) pages.push('...')
    }
  }

  if (total > 1) {
    pages.push(total)
  }

  return pages
})

const changePage = (page: number | string) => {
  if (typeof page === 'string' || page < 1 || page > props.totalPages) return
  emit('page-change', page)
}
</script>

<template>
  <div class="main__pagination">
    <button
      class="main__pagination--btn-left"
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      <img
        v-if="isDarkMode"
        class="main__pagination--arrow-left"
        src="../assets/img/arrow-light.svg"
        alt="Назад"
      />
      <img v-else src="../assets/img/arrow.svg" alt="Назад" />
    </button>

    <template v-for="(page, index) in visiblePages" :key="index">
      <button
        v-if="page !== '...'"
        class="main__pagination--number"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      <span v-else class="main__pagination--number-dot">
        {{ page }}
      </span>
    </template>

    <button
      class="main__pagination--btn-right"
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      <img
        v-if="isDarkMode"
        class="main__pagination--arrow-right"
        src="../assets/img/arrow-light.svg"
        alt="Вперед"
      />
      <img
        v-else
        class="main__pagination--arrow-right"
        src="../assets/img/arrow.svg"
        alt="Вперед"
      />
    </button>
  </div>
</template>
