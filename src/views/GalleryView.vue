<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { fetchPaintings, fetchAuthors, fetchLocations } from '@/api/paintingsApi'
import type { Author, Location, Painting } from '@/types'

// Components
import CardItem from '../components/CardItem.vue'
import SearchItem from '../components/SearchItem.vue'
import PaginationCards from '../components/PaginationCards.vue'
import LoadingCards from '../components/LoadingCards.vue'
import ErrorCards from '../components/ErrorCards.vue'
import NoResultsCards from '../components/NoResultsCards.vue'

// State
const paintings = ref<Painting[]>([])
const authors = ref<Record<number, Author>>({})
const locations = ref<Record<number, Location>>({})
const loading = ref(true)
const error = ref('')
const currentPage = ref(1)
const totalPages = ref(6)
const searchQuery = ref('')
const isDarkMode = ref(false)

// Methods
// Если темная тема включена
const checkDarkMode = () => {
  isDarkMode.value = document.body.classList.contains('dark-mode')
}

const loadData = async () => {
  try {
    loading.value = true
    error.value = ''
    paintings.value = []

    const [paintingsData, authorsData, locationsData] = await Promise.all([
      fetchPaintings(currentPage.value, searchQuery.value),
      fetchAuthors(),
      fetchLocations(),
    ])

    paintings.value = paintingsData.data
    authors.value = authorsData
    locations.value = locationsData
    totalPages.value = Math.ceil(paintingsData.total / 6)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
}

const getAuthorName = (id: number) => authors.value[id]?.name || 'Unknown artist'
const getLocationName = (id: number) => locations.value[id]?.location || 'Location unknown'

// Lifecycle
onMounted(() => {
  checkDarkMode()
  loadData()

  const observer = new MutationObserver(() => checkDarkMode())
  observer.observe(document.body, { attributes: true })
})

// Watchers
watch([currentPage, searchQuery], () => loadData())
</script>

<template>
  <SearchItem @search="handleSearch" />

  <LoadingCards v-if="loading" />
  <ErrorCards v-else-if="error" :message="error" />
  <NoResultsCards v-else-if="!paintings.length" :query="searchQuery" />
  <template v-else>
    <div class="main__cards">
      <CardItem
        v-for="painting in paintings"
        :key="painting.id"
        :id="painting.id"
        :name="getAuthorName(painting.authorId)"
        :location="getLocationName(painting.locationId)"
        :imageUrl="painting.imageUrl"
        :workName="painting.name"
        :workYear="painting.created"
      />
    </div>
    <PaginationCards
      v-if="paintings.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      :is-dark-mode="isDarkMode"
      @page-change="(page) => (currentPage = page)"
    />
  </template>
</template>
