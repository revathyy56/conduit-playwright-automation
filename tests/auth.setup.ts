import { test as setup, expect } from '@playwright/test';
import { authFile } from '../playwright.config';
import { env } from '../testData/data';

setup('login and save session', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('Email').fill(env.email)
    await page.getByPlaceholder('Password').fill(env.password)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page.getByRole('link', { name: 'New Article' })).toBeVisible()

    // Save cookies/localStorage
    await page.context().storageState({ path: authFile })
})
