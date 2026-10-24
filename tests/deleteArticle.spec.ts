import { test } from '../lib/fixtures/conduitPageFixtures'
import { expect } from '@playwright/test'
import { articles } from '../testData/data'

test.describe('Delete Article', () => {
    // Attach a screenshot when a test fails
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('failure', { body: await page.screenshot(), contentType: 'image/png' })
        }
    })

    test('deletes an article', async ({ page, homePage, editorPage, articlePage }) => {
        const { title, about, body, tag } = articles[1]
        const uniqueTitle = `${title} ${Date.now()}`

        // create an article to delete
        await page.goto('/')
        await homePage.openNewArticle()
        await editorPage.publishArticle(uniqueTitle, about, body, tag)
        const articleTitle = await articlePage.isArticleTitleDisplayed()
        await expect(articleTitle).toHaveText(uniqueTitle)

        // delete it
        await articlePage.deleteArticle()
        await expect(page).not.toHaveURL(/article/)
        await homePage.openGlobalFeed()
        const deleted = await homePage.articleInFeed(uniqueTitle)
        await expect(deleted).toHaveCount(0)
    })
})
