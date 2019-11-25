# UI Testing Examples

## Jest and Puppeteer

In `./src/integration` is the setup to use `jest-puppeteer` to create browser driven tests

### Example

```javascript
describe('app', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8081/')
  })

  it('should display Make Things', async () => {
    await expect(page).toMatch('Make Things')
  })
})

```

## Cucumber and Puppeteer

In `./src/features` is the setup for using `cucumber` tests to drive puppeteer for functional integration tests

### Examples

#### Feature File

```feature
Feature: Home Page
  In order to use the site
  As a user
  I want to go to home page

  Scenario: go to
    Given I go to 'homepage'
    When the page loads
    Then the page should show 'Make Things'
```

#### Steps

```javascript
const { After, AfterAll, Given, When, Then } = require('cucumber')
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

```

#### Support Code

```javascript
// world.js
const { setWorldConstructor } = require('cucumber')
const puppeteer = require('puppeteer')

const expect = require('expect-puppeteer')
const scope = require('./scope') // empty object

const World = function() {
  scope.driver = puppeteer
  scope.host = 'http://localhost:8084'
  scope.context = {}
  scope.expect = expect
}

setWorldConstructor(World)

// actions.js
const scope = require('./scope')
const pages = {} // object of pages
// Defines whether puppeteer runs Chrome in headless mode.
const headless = true
const slowMo = 5

const goToPage = async page => {
  if (!scope.browser) {
    scope.browser = await scope.driver.launch({ headless, slowMo })
  }
  scope.context.currentPage = await scope.browser.newPage()
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 })
  const url = scope.host + pages.home
  return scope.context.currentPage.goto(url, {
    waitUntil: 'networkidle2',
  })
}

const hasTitle = async text => {
  const selector = 'h1.title'
  const page = scope.context.currentPage
  const title = await page.$eval(selector, el => el.innerHTML)
  assert(title === text)
}

module.exports = {
  goToPage,
  hasTitle,
}

```
