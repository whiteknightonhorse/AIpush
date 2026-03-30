import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e/specs",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: 1,
  fullyParallel: false,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/playwright", open: "never" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:3000",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  globalSetup: "tests/e2e/fixtures/global-setup.ts",
  globalTeardown: "tests/e2e/fixtures/global-teardown.ts",
  outputDir: "reports/playwright/test-results",
});
