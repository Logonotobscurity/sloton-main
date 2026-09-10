import { test, expect } from '@playwright/test';

test.describe('Desktop Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
  });

  test('should display the main navigation links and triggers', async ({ page }) => {
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Solutions' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Resources' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Company' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Partners' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact Us' })).toBeVisible();
  });

  test('should open the Solutions mega-menu on hover', async ({ page }) => {
    await page.getByRole('button', { name: 'Solutions' }).hover();
    await expect(page.getByRole('link', { name: 'AI Solutions' })).toBeVisible();
  });
});

test.describe('Tablet Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto('/');
  });

  test('should keep condensed horizontal nav at 1024px', async ({ page }) => {
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('button', { name: /navigation menu/i })).toHaveCount(0);
  });
});

test.describe('Mobile Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
  });

  test('should open the mobile menu and display navigation links', async ({ page }) => {
    await page.getByRole('button', { name: /navigation menu/i }).click();
    await expect(page.getByLabel('Mobile navigation menu')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Solutions' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Company' })).toBeVisible();
    await page.getByRole('button', { name: 'Solutions' }).click();
    await expect(page.getByRole('link', { name: 'AI Solutions', exact: true })).toBeVisible();
  });
});
