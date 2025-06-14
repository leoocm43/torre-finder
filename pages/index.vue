<template>
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Torre Finder
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Discover talented professionals and explore statistics
      </p>
      <div class="space-x-4">
        <NuxtLink 
          to="/people"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Find People
        </NuxtLink>
        <NuxtLink 
          to="/statistics"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          View Statistics
        </NuxtLink>
      </div>
    </div>
  </div>
</template>