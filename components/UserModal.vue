<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-6">
          <h2 class="text-2xl font-bold text-gray-900">User Details</h2>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div class="space-y-6">
          <div class="flex items-center">
            <template v-if="user.person">
              <img
                :src="user.person.picture"
                :alt="user.person.name"
                class="w-24 h-24 rounded-full object-cover mr-6"
              />
            </template>
            <template v-else>
              <!-- User SVG icon as fallback -->
              <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mr-6">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </template>
            <div>
              <h3 class="text-xl font-semibold text-gray-900">{{ user.person?.name }}</h3>

              <p class="text-gray-700 mt-2">{{ user.person?.location?.name }}</p>
            </div>
          </div>
          
          <div v-if="user.person">
            <h4 class="text-lg font-semibold text-gray-900 mb-2">Location</h4>
            📍 <p class="text-gray-700">{{ user.person?.location?.name }}, {{ user.person?.location?.country }}</p>
          </div>
          
          <div v-if="user.skills && user.skills.length > 0">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Skills</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in user.skills"
                :key="skill.name"
                class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {{ skill.name }} ({{ skill.weight }})
              </span>
            </div>
          </div>
          
          <div v-if="user.experiences && user.experiences.length > 0">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Experience</h4>
            <div class="space-y-3">
              <div
                v-for="experience in user.experiences.slice(0, 5)"
                :key="experience.id"
                class="border-l-4 border-blue-500 pl-4"
              >
                <h5 class="font-medium text-gray-900">{{ experience.name }}</h5>
                <p class="text-sm text-gray-600">{{ experience.category }}</p>
                <div v-if="experience.organizations && experience.organizations.length > 0" class="mt-1">
                  <span class="text-sm text-gray-500">
                    at {{ experience.organizations[0].name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="user.education && user.education.length > 0">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Education</h4>
            <div class="space-y-3">
              <div
                v-for="education in user.education.slice(0, 3)"
                :key="education.id"
                class="border-l-4 border-green-500 pl-4"
              >
                <h5 class="font-medium text-gray-900">{{ education.name }}</h5>
                <p class="text-sm text-gray-600">{{ education.category }}</p>
                <div v-if="education.organizations && education.organizations.length > 0" class="mt-1">
                  <span class="text-sm text-gray-500">
                    at {{ education.organizations[0].name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 flex justify-end">
          <button
            @click="$emit('close')"
            class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

defineProps<{
  user: User
}>()

defineEmits<{
  close: []
}>()
</script>