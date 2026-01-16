import { test, expect } from '@playwright/test';

test.describe('Desktop Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main navigation links and triggers', async ({ page }) => {
    // Check for dropdown triggers in the main navigation menu
    await expect(page.getByRole('button', { name: 'Solutions' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Resources' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Company' })).toBeVisible();

    // Check for direct links in the main navigation
    await expect(page.getByRole('link', { name: 'Partners' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible();
  });

  test('should open the Solutions mega-menu on hover', async ({ page }) => {
    // Hover over the Solutions trigger to open the mega menu
    await page.getByRole('button', { name: 'Solutions' }).hover();
    // Check if a link within the mega menu is visible
    await expect(page.getByRole('link', { name: 'AI Solutions' })).toBeVisible();
  });
});

test.describe('Mobile Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport to a mobile size to trigger mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
  });

  test('should open the mobile menu and display navigation links', async ({ page }) => {
    // Click the menu button to open the mobile navigation sheet
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await expect(page.getByLabel('Mobile navigation menu')).toBeVisible();

    // Check for accordion triggers within the mobile menu
    await expect(page.getByRole('button', { name: 'Solutions' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Company' })).toBeVisible();

    // Open the "Solutions" accordion and verify a link is visible
    await page.getByRole('button', { name: 'Solutions' }).click();
    await expect(page.getByRole('link', { name: 'AI Solutions', exact: true })).toBeVisible();
  });
});
