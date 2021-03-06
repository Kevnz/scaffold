const { After, AfterAll, Before, Given, When, Then } = require('cucumber')
const scope = require('../support/scope')
const { goToPage, hasTitle } = require('../support/actions')

Given('I go to {string}', goToPage)

When('the page loads', function() {
  return true
})

Then('the page should show {string}', function(string) {
  return hasTitle(string)
})

After(async () => {
  // Here we check if a scenario has instantiated a browser and a current page
  if (scope.browser && scope.context.currentPage) {
    // if it has, find all the cookies, and delete them
    const cookies = await scope.context.currentPage.cookies()
    if (cookies && cookies.length > 0) {
      await scope.context.currentPage.deleteCookie(...cookies)
    }
    // close the web page down
    await scope.context.currentPage.close()
    // wipe the context's currentPage value
    scope.context.currentPage = null
  }
})

AfterAll(async () => {
  // If there is a browser window open, then close it
  if (scope.browser) await scope.browser.close()
})
