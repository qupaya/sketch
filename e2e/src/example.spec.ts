import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/overview');

  // Expect span to contain a substring.
  await expect(page.locator('span').first()).toContainText('ng-sketch');
});
