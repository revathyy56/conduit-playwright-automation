import { test } from '../lib/fixtures/conduitPageFixtures'
import { expect } from '@playwright/test'
import { articles } from '../testData/data'

test.describe('Edit Article', () => {
    // Attach a screenshot when a test fails
    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await testInfo.attach('failure', { body: await page.screenshot(), contentType: 'image/png' })
        }
    })

    test('edits the title and body of an article', async ({ page, homePage, editorPage, articlePage }) => {
        const { title, about, body, tag } = articles[0]
        const uniqueTitle = `${title} ${Date.now()}`
        const newTitle = `${uniqueTitle} Edited`
        const newBody = 'This body was updated by the edit test.'

        // create an article to edit
        await page.goto('/')
        await homePage.openNewArticle()
        await editorPage.publishArticle(uniqueTitle, about, body, tag)
        const articleTitle = await articlePage.isArticleTitleDisplayed()
        await expect(articleTitle).toHaveText(uniqueTitle)

        // edit it
        await articlePage.editArticle()
        await expect(page).toHaveURL(/editor/)
        await editorPage.updateArticle(newTitle, newBody)

        await expect(articleTitle).toHaveText(newTitle)
        const articleBody = await articlePage.isArticleBodyDisplayed()
        await expect(articleBody).toContainText(newBody)
    })
})
