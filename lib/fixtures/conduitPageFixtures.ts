import { test as BaseTest } from '@playwright/test'

import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/homePage'
import EditorPage from '../pages/editorPage'
import ArticlePage from '../pages/articlePage'


type MyPages = {
    loginPage: LoginPage;
    homePage: HomePage;
    editorPage: EditorPage;
    articlePage: ArticlePage;
}

export const test = BaseTest.extend<MyPages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    editorPage: async ({ page }, use) => {
        await use(new EditorPage(page));
    },
    articlePage: async ({ page }, use) => {
        await use(new ArticlePage(page));
    },
})
