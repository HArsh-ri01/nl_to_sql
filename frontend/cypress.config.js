// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '2x9k21',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  env: {
    apiUrl: 'http://159.65.151.166:8080'
  }
})