import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '.env') });

// Saved login session
export const authFile = path.join(__dirname, '.auth/user.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['html', { outputFolder: path.join(__dirname, 'playwright-report') }]],
  outputDir: path.join(__dirname, 'test-results'),
  timeout: 40000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: process.env.CONDUIT_BASE_URL ?? 'https://conduit.bondaracademy.com',
    headless: false,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'teardown',
      testMatch: /.*\.teardown\.ts/,
      use: { storageState: authFile },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: authFile },
      dependencies: ['setup'],
    },
  ],
});
