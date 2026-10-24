import { test } from '../lib/fixtures/conduitPageFixtures'
import { expect } from '@playwright/test'
import { env } from '../testData/data'

// These tests need a logged-OUT browser, so drop the saved session
test.use({ storageState: { cookies: [], origins: [] } })

test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login')
    })

    // Attach a screenshot when a test fails
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('failure', { body: await page.screenshot(), contentType: 'image/png' })
        }
    })

    test('login with valid credentials', async ({ page, loginPage, homePage }) => {
        await loginPage.userLogin(env.email, env.password)
        const newArticle = await homePage.isLoggedIn()
        await expect(newArticle).toBeVisible()
        await expect(page).not.toHaveURL(/login/)
    })

    test('login with wrong password shows error', async ({ page, loginPage }) => {
        await loginPage.userLogin(env.email, 'wrong_password')
        const error = await loginPage.isErrorDisplayed()
        await expect(error).toBeVisible()
        await expect(page).toHaveURL(/login/)
    })
})
