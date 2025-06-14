<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg shadow p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Find People</h1>
      
      <div class="flex gap-4 mb-6">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for people, skills, or companies..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            @keyup.enter="handleSearch"
          />
        </div>
        <button
          @click="handleSearch"
          :disabled="!searchQuery.trim() || usersStore.loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ usersStore.loading ? 'Searching...' : 'Search' }}
        </button>
      </div>

      <div v-if="usersStore.error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p class="text-red-600">{{ usersStore.error }}</p>
      </div>
    </div>

    <div v-if="usersStore.users.length > 0" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserCard
          v-for="user in usersStore.users"
          :key="user.id"
          :user="user"
          :loading="loadingUser === user.username"
          @view-details="openUserModal"
        />
      </div>

      <Pagination
        :total="usersStore.pagination.total"
        :current-page="currentPage"
        :page-size="pageSize"
        @page-change="handlePageChange"
      />
    </div>

    <div v-else-if="hasSearched && !usersStore.loading" class="text-center py-12">
      <p class="text-gray-500 text-lg">No results found. Try a different search term.</p>
    </div>

    <UserModal
      v-if="selectedUser"
      :user="selectedUser"
      @close="closeUserModal"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

const usersStore = useUsersStore()

const searchQuery = ref('')
const hasSearched = ref(false)
const selectedUser = ref<User | null>(null)
const currentPage = ref(1)
const pageSize = ref(20)

const handleSearch = async () => {
  if (!searchQuery.value.trim()) return
  
  currentPage.value = 1
  hasSearched.value = true
  await usersStore.searchUsers(searchQuery.value)
}

const handlePageChange = async (page: number) => {
  currentPage.value = page
  const offset = (page - 1) * pageSize.value
  await usersStore.searchUsers(searchQuery.value)
}

const loadingUser = ref<string | null>(null)

const openUserModal = async (user: User) => {
  loadingUser.value = user.username
  const details = await usersStore.getUserDetails(user.username)
  if (details) {
    selectedUser.value = details
  }
  loadingUser.value = null
}
  

const closeUserModal = () => {
  selectedUser.value = null
}
</script>