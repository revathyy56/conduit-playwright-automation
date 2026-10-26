import { test } from '../lib/fixtures/conduitPageFixtures'
import { expect } from '@playwright/test'
import { articles } from '../testData/data'

test.describe('Delete Article', () => {
    // Attach a screenshot - when test fails
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('failure', { body: await page.screenshot(), contentType: 'image/png' })
        }
    })

    // Deletes only one of the articles added by addArticle.spec.ts
    test('deletes an article', async ({ page, homePage, articlePage }) => {
        await page.goto('/')
        await homePage.openGlobalFeed()
        await homePage.openArticle(articles[2].title)
        await expect(page).toHaveURL(/article/)

        const articleTitle = await articlePage.isArticleTitleDisplayed()
        await expect(articleTitle).toContainText(articles[2].title)
        const deletedTitle = await articleTitle.textContent()

        await articlePage.deleteArticle()
        await expect(page).not.toHaveURL(/article/)

        await homePage.openGlobalFeed()
        const deleted = await homePage.articleInFeed(deletedTitle!)
        await expect(deleted).toHaveCount(0)
    })
})
