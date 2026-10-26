import { Page, Locator } from '@playwright/test'

export default class HomePage {
    readonly page: Page
    readonly newArticleLink: Locator
    readonly globalFeed: Locator

    constructor(page: Page) {
        this.page = page
        this.newArticleLink = this.page.getByRole('link', { name: 'New Article' })
        this.globalFeed = this.page.getByText('Global Feed')
    }

    async isLoggedIn(): Promise<Locator> {
        return this.newArticleLink
    }

    async openNewArticle() {
        await this.newArticleLink.click()
    }

    async openGlobalFeed() {
        await this.globalFeed.click()
    }

    async articleInFeed(title: string): Promise<Locator> {
        return this.page.getByRole('heading', { name: title })
    }

    async openArticle(title: string) {
        await this.page.getByRole('link', { name: title }).first().click()
    }
}
