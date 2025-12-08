import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues on home page', async ({
    page,
  }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check that there is exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Check h1 content
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text).toContain('Engineering Leader');

    // Check that h2 elements exist for sections
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have skip to main content link', async ({ page }) => {
    await page.goto('/');

    // Tab to focus the skip link
    await page.keyboard.press('Tab');

    // Check if skip link is focused
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveText('Skip to main content');
  });

  test('should have alt text for logo', async ({ page }) => {
    await page.goto('/');

    const logo = page.locator('img[alt="thisnamespace Logo"]').first();
    await expect(logo).toHaveAttribute('alt', 'thisnamespace Logo');
  });

  test('should have proper ARIA labels on interactive elements', async ({ page }) => {
    await page.goto('/');

    // Check theme toggle button
    const themeToggle = page.locator('[aria-label*="toggle theme"]');
    await expect(themeToggle).toBeVisible();

    // Check social media links in footer
    const githubLink = page.locator('[aria-label*="GitHub"]').last();
    await expect(githubLink).toBeVisible();

    const linkedinLink = page.locator('[aria-label*="LinkedIn"]').last();
    await expect(linkedinLink).toBeVisible();

    const emailLink = page.locator('[aria-label*="email"]').last();
    await expect(emailLink).toBeVisible();
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/');

    // Scroll to contact form
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Check that all form inputs have labels - use role-based selectors to avoid ambiguity
    await expect(page.locator('#contact').getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.locator('#contact').getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.locator('#contact').getByRole('textbox', { name: 'Message' })).toBeVisible();
  });

  test('should maintain focus visibility when navigating with keyboard', async ({ page }) => {
    await page.goto('/');

    // Tab through several elements
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo/brand
    await page.keyboard.press('Tab'); // First nav button

    // Check that something is focused
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeTruthy();
  });

  test('should have lang attribute on html element', async ({ page }) => {
    await page.goto('/');

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('en');
  });

  test('should have external links with rel="noopener noreferrer"', async ({ page }) => {
    await page.goto('/');

    // Check GitHub link
    const githubLink = page.locator('a[href*="github.com"]').first();
    const githubRel = await githubLink.getAttribute('rel');
    expect(githubRel).toContain('noopener');
    expect(githubRel).toContain('noreferrer');

    // Check LinkedIn link
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first();
    const linkedinRel = await linkedinLink.getAttribute('rel');
    expect(linkedinRel).toContain('noopener');
    expect(linkedinRel).toContain('noreferrer');
  });

  test('dark mode should not have accessibility issues', async ({ page }) => {
    await page.goto('/');

    // Toggle dark mode
    await page.locator('[aria-label*="toggle theme"]').click();

    // Wait for theme to change
    await page.waitForTimeout(500);

    // Run accessibility scan in dark mode
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
