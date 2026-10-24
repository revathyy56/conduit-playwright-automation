import { Page, Locator } from '@playwright/test'

export default class EditorPage {
    readonly page: Page
    readonly title: Locator
    readonly about: Locator
    readonly body: Locator
    readonly tags: Locator
    readonly publishBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.title = this.page.getByPlaceholder('Article Title')
        this.about = this.page.getByPlaceholder("What's this article about?")
        this.body = this.page.getByPlaceholder('Write your article (in markdown)')
        this.tags = this.page.getByPlaceholder('Enter tags')
        this.publishBtn = this.page.getByRole('button', { name: 'Publish Article' })
    }

    async publishArticle(strTitle: string, strAbout: string, strBody: string, strTag: string) {
        await this.title.fill(strTitle)
        await this.about.fill(strAbout)
        await this.body.fill(strBody)
        await this.tags.fill(strTag)
        await this.publishBtn.click()
    }

    async updateArticle(strTitle: string, strBody: string) {
        await this.title.fill(strTitle)
        await this.body.fill(strBody)
        await this.publishBtn.click()
    }
}
