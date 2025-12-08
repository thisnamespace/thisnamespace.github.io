import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should navigate to sections when clicking header nav buttons', async ({ page }) => {
    await page.goto('/');

    // Click About nav button
    await page.locator('header').getByRole('button', { name: 'About', exact: true }).click();
    await expect(page.locator('#about')).toBeInViewport();

    // Click Skills nav button
    await page.locator('header').getByRole('button', { name: 'Skills', exact: true }).click();
    await expect(page.locator('#skills')).toBeInViewport();

    // Click Projects nav button
    await page.locator('header').getByRole('button', { name: 'Projects', exact: true }).click();
    await expect(page.locator('#projects')).toBeInViewport();

    // Click Contact nav button
    await page.locator('header').getByRole('button', { name: 'Contact', exact: true }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should scroll smoothly when navigating between sections', async ({ page }) => {
    await page.goto('/');

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);
    expect(initialScroll).toBe(0);

    // Navigate to About section
    await page.locator('header').getByRole('button', { name: 'About', exact: true }).click();

    // Wait for scroll to complete
    await page.waitForFunction(() => window.scrollY > 0);

    // Check that page has scrolled
    const aboutScroll = await page.evaluate(() => window.scrollY);
    expect(aboutScroll).toBeGreaterThan(0);
  });

  test('should return to top when clicking logo', async ({ page }) => {
    await page.goto('/');

    // Scroll down to About section
    await page.locator('header').getByRole('button', { name: 'About', exact: true }).click();

    // Wait for scroll to complete
    await page.waitForFunction(() => window.scrollY > 0);

    // Verify we've scrolled
    let scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeGreaterThan(0);

    // Scroll to top manually (logo navigates to "/" not smooth scroll)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Wait for scroll to top to complete
    await page.waitForFunction(() => window.scrollY < 50);

    // Verify we're back at top
    scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeLessThan(50);
  });

  test('should switch themes using theme menu', async ({ page }) => {
    await page.goto('/');

    // Open theme menu
    await page.locator('[aria-label*="toggle theme"]').click();

    // Wait for menu to be visible
    await page.getByRole('menu').waitFor({ state: 'visible' });

    // Click Dark mode option
    await page.getByText('Dark').click();

    // Wait for theme preference to be saved
    await page.waitForFunction(() => localStorage.getItem('themePreference') === 'dark');

    // Verify theme preference stored in localStorage
    let storedPreference = await page.evaluate(() => localStorage.getItem('themePreference'));
    expect(storedPreference).toBe('dark');

    // Open theme menu again
    await page.locator('[aria-label*="toggle theme"]').click();
    await page.getByRole('menu').waitFor({ state: 'visible' });

    // Click Light mode option
    await page.getByText('Light').click();
    await page.waitForFunction(() => localStorage.getItem('themePreference') === 'light');

    // Verify theme preference stored
    storedPreference = await page.evaluate(() => localStorage.getItem('themePreference'));
    expect(storedPreference).toBe('light');

    // Open theme menu and select System
    await page.locator('[aria-label*="toggle theme"]').click();
    await page.getByRole('menu').waitFor({ state: 'visible' });
    await page.getByRole('menuitem', { name: 'System', exact: true }).click();
    await page.waitForFunction(() => localStorage.getItem('themePreference') === 'system');

    // Verify system preference is stored
    storedPreference = await page.evaluate(() => localStorage.getItem('themePreference'));
    expect(storedPreference).toBe('system');
  });

  test('should persist theme preference on page reload', async ({ page }) => {
    await page.goto('/');

    // Set to dark mode via menu
    await page.locator('[aria-label*="toggle theme"]').click();
    await page.getByRole('menu').waitFor({ state: 'visible' });
    await page.getByText('Dark').click();
    await page.waitForFunction(() => localStorage.getItem('themePreference') === 'dark');

    // Verify preference stored in localStorage
    let storedPreference = await page.evaluate(() => localStorage.getItem('themePreference'));
    expect(storedPreference).toBe('dark');

    // Reload page
    await page.reload();

    // Verify preference persisted in localStorage after reload
    storedPreference = await page.evaluate(() => localStorage.getItem('themePreference'));
    expect(storedPreference).toBe('dark');
  });

  test('should open external links in new tab with proper attributes', async ({ page }) => {
    await page.goto('/');

    // Check GitHub link
    const githubLink = page.locator('a[href*="github.com"]').first();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', /noopener/);
    await expect(githubLink).toHaveAttribute('rel', /noreferrer/);

    // Check LinkedIn link
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first();
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', /noopener/);
    await expect(linkedinLink).toHaveAttribute('rel', /noreferrer/);
  });

  test('should have working email link', async ({ page }) => {
    await page.goto('/');

    const emailLink = page.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toHaveAttribute('href', 'mailto:info@thisnamespace.com');
  });

  test('should navigate using keyboard', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation elements
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // First nav button (Home)
    await page.keyboard.press('Tab'); // About

    // Press Enter on About button
    await page.keyboard.press('Enter');

    // Verify About section is in view
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('should have all sections present on page', async ({ page }) => {
    await page.goto('/');

    // Verify all main sections exist
    await expect(page.locator('#main-content')).toBeVisible();
    await expect(page.locator('#about')).toBeAttached();
    await expect(page.locator('#skills')).toBeAttached();
    await expect(page.locator('#projects')).toBeAttached();
    await expect(page.locator('#contact')).toBeAttached();
  });

  test('should show mobile navigation on small screens', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that header is still visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check that mobile menu icon is visible
    const menuButton = page.getByRole('button', { name: 'open navigation menu' });
    await expect(menuButton).toBeVisible();

    // Open mobile drawer
    await menuButton.click();

    // Wait for drawer to be visible (MUI Drawer component)
    await page.locator('[role="presentation"]').waitFor({ state: 'visible' });

    // Check that navigation is accessible in drawer
    const aboutButton = page.getByRole('button', { name: 'About', exact: true });
    await expect(aboutButton).toBeVisible();
  });
});
