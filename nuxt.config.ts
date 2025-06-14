export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: true
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://torre.ai', // <-- Replace with your real API base URL
        changeOrigin: true,
        prependPath: true,
      }
    }
  }
})