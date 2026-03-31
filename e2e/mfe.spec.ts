import { test, expect } from '@playwright/test';

test.describe('Shell App - Navigation', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('MFE Architecture');
  });

  test('should navigate to dashboard', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Dashboard")');
    await expect(page.locator('h2')).toContainText('Dashboard');
  });

  test('should navigate to checkout', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Checkout")');
    await expect(page.locator('h2')).toContainText('Checkout');
  });

  test('should navigate to settings', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Settings")');
    await expect(page.locator('h2')).toContainText('Settings');
  });
});

test.describe('Dashboard MFE', () => {
  test('should display order stats', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Dashboard")');
    await expect(page.locator('text=Total Orders')).toBeVisible();
    await expect(page.locator('text=Completed')).toBeVisible();
  });

  test('should show recent orders table', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Dashboard")');
    await expect(page.locator('th:has-text("Order ID")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();
  });
});

test.describe('Checkout MFE', () => {
  test('should display order summary', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Checkout")');
    await expect(page.locator('h3:has-text("Order Summary")')).toBeVisible();
  });

  test('should proceed to payment', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Checkout")');
    await page.click('button:has-text("Proceed to Payment")');
    await expect(page.locator('h3:has-text("Select Payment Method")')).toBeVisible();
  });

  test('should complete purchase', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Checkout")');
    await page.click('button:has-text("Proceed to Payment")');
    await page.click('button:has-text("Complete Purchase")');
    await expect(page.locator('text=Order Confirmed')).toBeVisible();
  });
});

test.describe('Settings MFE', () => {
  test('should display theme selector', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Settings")');
    await expect(page.locator('text=Theme')).toBeVisible();
  });

  test('should change theme', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Settings")');
    await page.click('button:has-text("dark")');
    await page.click('button:has-text("Save Settings")');
    await expect(page.locator('text=Settings saved')).toBeVisible();
  });

  test('should display language selector', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Settings")');
    await expect(page.locator('text=Language')).toBeVisible();
  });
});
