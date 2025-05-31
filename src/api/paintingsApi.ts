import type { Painting, Author, Location } from '@/types'

const API_BASE = 'https://test-front.framework.team'

export const fetchAuthors = async (): Promise<Record<number, Author>> => {
  try {
    const response = await fetch(`${API_BASE}/authors`)
    const data: Author[] = await response.json()
    return data.reduce((acc, author) => ({ ...acc, [author.id]: author }), {})
  } catch (err) {
    console.error('Failed to fetch authors:', err)
    return {}
  }
}

export const fetchLocations = async (): Promise<Record<number, Location>> => {
  try {
    const response = await fetch(`${API_BASE}/locations`)
    const data: Location[] = await response.json()
    return data.reduce((acc, location) => ({ ...acc, [location.id]: location }), {})
  } catch (err) {
    console.error('Failed to fetch locations:', err)
    return {}
  }
}

export const fetchPaintings = async (
  page: number = 1,
  search: string = '',
): Promise<{ data: Painting[]; total: number }> => {
  try {
    let url = `${API_BASE}/paintings?_page=${page}&_limit=6`
    if (search) url += `&q=${encodeURIComponent(search)}`

    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch paintings')

    const total = parseInt(response.headers.get('X-Total-Count') || '0')
    const data: Painting[] = await response.json()

    return {
      data: data.map((item) => ({
        id: item.id || 0,
        name: item.name || 'Unknown work',
        authorId: item.authorId,
        locationId: item.locationId,
        created: item.created || 'Year unknown',
        imageUrl: item.imageUrl || '',
      })),
      total,
    }
  } catch (err) {
    console.error('Failed to fetch paintings:', err)
    throw err
  }
}
