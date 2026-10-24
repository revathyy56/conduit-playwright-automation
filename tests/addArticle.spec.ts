import { test } from '../lib/fixtures/conduitPageFixtures'
import { expect } from '@playwright/test'
import { articles } from '../testData/data'

test.describe('Add Articles', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('failure', { body: await page.screenshot(), contentType: 'image/png' })
        }
    })

    // Data-driven from articles.json
    for (const { title, about, body, tag } of articles) {
        test(`adds article ${title}`, async ({ page, homePage, editorPage, articlePage }) => {
            const uniqueTitle = `${title} ${Date.now()}`
            await homePage.openNewArticle()
            await editorPage.publishArticle(uniqueTitle, about, body, tag)

            await expect(page).toHaveURL(/article/)
            const articleTitle = await articlePage.isArticleTitleDisplayed()
            await expect(articleTitle).toHaveText(uniqueTitle)
            const articleBody = await articlePage.isArticleBodyDisplayed()
            await expect(articleBody).toContainText(body)
        })
    }
})
