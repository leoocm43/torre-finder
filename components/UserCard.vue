<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="flex items-center mb-4">
      <template v-if="user.imageUrl">
        <img
          :src="user.imageUrl"
          :alt="user.name"
          class="w-16 h-16 rounded-full object-cover mr-4"
        />
      </template>
      <template v-else>
        <!-- User SVG icon as fallback -->
        <div class="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </template>
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900">{{ user.name }}</h3>
        <p class="text-sm text-gray-600">@{{ user.username }}</p>
      </div>
    </div>
    
    
    <div v-if="user.skills && user.skills.length > 0" class="mb-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="skill in user.skills.slice(0, 3)"
          :key="skill.name"
          class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
        >
          {{ skill.name }}
        </span>
        <span
          v-if="user.skills.length > 3"
          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
        >
          +{{ user.skills.length - 3 }} more
        </span>
      </div>
    </div>
    
    <button
      @click="handleViewDetails"
      class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
      :disabled="loading"
    >
      <span v-if="loading" class="flex items-center">
        <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        Loading...
      </span>
      <span v-else>
        View Details
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{
  user: User
  loading?: boolean
}>()

const emit = defineEmits<{
  viewDetails: [user: User]
}>()

const handleViewDetails = () => {
  emit('viewDetails', props.user)
}
</script>