const { After, AfterAll, Before, Given, When, Then } = require('cucumber')
const scope = require('../support/scope')
const { clickLink } = require('../support/actions')

When('I click the {string} link', clickLink)

Then('the page should show the Button {string}', function(string) {
  const page = scope.context.currentPage
  return scope.expect(page).toMatch(string)
})

When('I click the {string} Button', function(string) {
  const page = scope.context.currentPage
  return scope.expect(page).toClick('button', { text: string })
})

Then('the page should show the text {string}', function(string) {
  const page = scope.context.currentPage
  return scope.expect(page).toMatch(string)
})

After(async () => {
  if (scope.browser && scope.context.currentPage) {
    const cookies = await scope.context.currentPage.cookies()
    if (cookies && cookies.length > 0) {
      await scope.context.currentPage.deleteCookie(...cookies)
    }

    await scope.context.currentPage.close()

    scope.context.currentPage = null
  }
})

AfterAll(async () => {
  if (scope.browser) await scope.browser.close()
})
