const { When, Then } = require('cucumber')
const { fillOutForm, hasText } = require('../support/actions')

When('I fill out the form', fillOutForm)

Then('the confirm dialog should be shown', () => hasText('Please Confirm'))
