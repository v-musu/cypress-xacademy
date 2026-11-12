const { defineConfig } = require("cypress")

module.exports = defineConfig({
  expose: {
    urlApi: 'https://api-with-bugs.practicesoftwaretesting.com'
  },
  e2e: {
    baseUrl: "https://with-bugs.practicesoftwaretesting.com",
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})