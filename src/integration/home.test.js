const { delay } = require('@kev_nz/async-tools')
describe('app', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8081/')
  })

  it('should display Make Things', async () => {
    await delay(3000)
    await expect(page).toMatch('Make Things')
    console.log('done')
  })
  it('should go to back-off page and test', async () => {
    await expect(page).toClick('a', { text: 'Back Off' })
    await delay(200)
    await expect(page).toMatch('Back Off')
    await expect(page).toClick('button', { text: 'Back Off Test' })
    await expect(page).toMatch('Executed 3 times')
  })
})
