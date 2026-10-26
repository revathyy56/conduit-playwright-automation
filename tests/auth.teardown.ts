import { test as teardown, expect } from '@playwright/test';

teardown('logout', async ({ page }) => {
    console.log('[teardown] Logging out once')
    await page.goto('/settings')
    await page.getByRole('button', { name: 'Or click here to logout.' }).click()
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible()
})
