import { test, expect } from '@playwright/test';

test.describe('Shell Application Navigation', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('MFE Architecture');
  });

  test('should navigate to Dashboard tab', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Dashboard');
    await expect(page.locator('h2')).toContainText('Dashboard');
  });

  test('should navigate to Checkout tab', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Checkout');
    await expect(page.locator('h2')).toContainText('Checkout');
  });

  test('should navigate to Settings tab', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Settings');
    await expect(page.locator('h2')).toContainText('Settings');
  });

  test('should display feature cards on home', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Checkout')).toBeVisible();
    await expect(page.locator('text=Settings')).toBeVisible();
  });
});

test.describe('Dashboard MFE', () => {
  test('should load dashboard with stats', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Dashboard');
    await expect(page.locator('text=Total Orders')).toBeVisible();
    await expect(page.locator('text=Completed')).toBeVisible();
    await expect(page.locator('text=Total Revenue')).toBeVisible();
  });
});

test.describe('Checkout MFE', () => {
  test('should load checkout with cart items', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Checkout');
    await expect(page.locator('text=Order Summary')).toBeVisible();
    await expect(page.locator('text=Proceed to Payment')).toBeVisible();
  });

  test('should proceed to payment step', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Checkout');
    await page.click('text=Proceed to Payment');
    await expect(page.locator('text=Select Payment Method')).toBeVisible();
  });

  test('should complete purchase', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Checkout');
    await page.click('text=Proceed to Payment');
    await page.click('text=Complete Purchase');
    await expect(page.locator('text=Order Confirmed')).toBeVisible();
  });
});

test.describe('Settings MFE', () => {
  test('should load settings page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Settings');
    await expect(page.locator('text=Appearance')).toBeVisible();
    await expect(page.locator('text=Localization')).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Settings');
    await page.click('button:has-text("dark")');
    await expect(page.locator('button:has-text("dark")')).toHaveClass(/bg-blue-600/);
  });

  test('should enable notifications', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Settings');
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  test('should save settings', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Settings');
    await page.click('text=Save Settings');
    await expect(page.locator('text=Settings saved')).toBeVisible();
  });
});
