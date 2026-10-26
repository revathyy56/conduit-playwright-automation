import { Page, Locator } from '@playwright/test'

export default class ArticlePage {
    readonly page: Page
    readonly heading: Locator
    readonly bodyText: Locator
    readonly editBtn: Locator
    readonly deleteBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.heading = this.page.getByRole('heading', { level: 1 })
        this.bodyText = this.page.locator('.article-content')
        this.editBtn = this.page.getByRole('link', { name: 'Edit Article' }).first()
        this.deleteBtn = this.page.getByRole('button', { name: 'Delete Article' }).first()
    }

    async isArticleTitleDisplayed(): Promise<Locator> {
        return this.heading
    }

    async isArticleBodyDisplayed(): Promise<Locator> {
        return this.bodyText
    }

    async editArticle() {
        await this.editBtn.click()
    }

    async deleteArticle() {
        await this.deleteBtn.click()
    }
}
