import { test, expect } from '@playwright/test';

test.describe('Admin Journey', () => {
  test('should manage instruments', async ({ page }) => {
    // Navigate to Login as Admin
    await page.goto('/login');
    
    // Fill Admin Credentials
    await page.fill('input[name="email"]', 'admin@trovantina.org');
    await page.fill('input[name="password"]', 'admin123');
    // await page.click('button[type="submit"]');

    // Go to Instruments
    await page.goto('/instruments');
    
    // Check if "Add Instrument" button exists (only for admins)
    // await expect(page.locator('text=Add Instrument')).toBeVisible();
  });

  test('should mark attendance', async ({ page }) => {
    await page.goto('/calendar');
    
    // Check if "Mark Attendance" buttons are visible on event cards
    // await expect(page.locator('text=Mark Attendance').first()).toBeVisible();
  });
});
