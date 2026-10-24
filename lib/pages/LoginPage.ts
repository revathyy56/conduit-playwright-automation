import { Page, Locator } from '@playwright/test'

export default class LoginPage {
    readonly page: Page
    readonly email: Locator
    readonly pwd: Locator
    readonly signInBtn: Locator
    readonly errorMsg: Locator

    constructor(page: Page) {
        this.page = page
        this.email = this.page.getByPlaceholder('Email')
        this.pwd = this.page.getByPlaceholder('Password')
        this.signInBtn = this.page.getByRole('button', { name: 'Sign in' })
        this.errorMsg = this.page.locator('.error-messages')
    }

    async userLogin(strEmail: string, strPwd: string) {
        await this.email.fill(strEmail)
        await this.pwd.fill(strPwd)
        await this.signInBtn.click()
    }

    async isErrorDisplayed(): Promise<Locator> {
        return this.errorMsg
    }
}
