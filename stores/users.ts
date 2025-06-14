import { defineStore } from 'pinia'
import type { User, SearchResponse, ApiResponse } from '~/types'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
    loading: false,
    error: null as string | null,
    pagination: {
      total: 0,
      offset: 0,
      size: 20
    }
  }),

  actions: {
    async searchUsers(query: string) {
      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        
            const response = await $fetch<SearchResponse>(`${config.public.apiBase}/api/entities/_search`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Cookie': 'torre.locale=en; trackingId=rB8lKGhKyJa3TgsaCUiFAg=='
              },
              body: {
                query,
                meta: false,
                limit: 20,
                torreGgId: "795137",
                identityType: "person",
                excludeContacts: true,
                excluding:[],
                excludedPeople: []
              }
            })
            console.error('API response:', response)
            if (response && response.results) {
              this.users = response.results || []
            } else {
              this.error = 'No results found or bad response'
              console.error('API response:', response)
            }
          } catch (error) {
            this.error = 'Failed to search users'
            console.error('Search error:', error)
          } finally {
            this.loading = false
      }
    },

    async getUserDetails(username: string) {
      this.loading = true
      this.error = null

      try {
        const config = useRuntimeConfig()
        const data = await $fetch<User>(`${config.public.apiBase}/api/genome/bios/${username}`)
        this.currentUser = data
        console.log('User details:', data)
        return data
      } catch (error) {
        this.error = 'Failed to fetch user details'
        console.error('User details error:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    clearCurrentUser() {
      this.currentUser = null
    }
  }
})