import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('should match homepage screenshot in light mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take screenshot of full page
    await expect(page).toHaveScreenshot('homepage-light.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match homepage screenshot in dark mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Switch to dark mode via menu
    await page.locator('[aria-label*="toggle theme"]').click();
    await page.waitForTimeout(200);
    await page.getByText('Dark').click();
    await page.waitForTimeout(500);

    // Take screenshot of full page in dark mode
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match Hero section in light mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hero = page.locator('section').first();
    await expect(hero).toHaveScreenshot('hero-light.png', {
      animations: 'disabled',
    });
  });

  test('should match About section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(about).toHaveScreenshot('about-section.png', {
      animations: 'disabled',
    });
  });

  test('should match Skills section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(skills).toHaveScreenshot('skills-section.png', {
      animations: 'disabled',
    });
  });

  test('should match Projects section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(projects).toHaveScreenshot('projects-section.png', {
      animations: 'disabled',
    });
  });

  test('should match Contact section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(contact).toHaveScreenshot('contact-section.png', {
      animations: 'disabled',
    });
  });

  test('should match Footer in light mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(footer).toHaveScreenshot('footer-light.png', {
      animations: 'disabled',
    });
  });

  test('should match Footer in dark mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Switch to dark mode via menu
    await page.locator('[aria-label*="toggle theme"]').click();
    await page.waitForTimeout(200);
    await page.getByText('Dark').click();
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(footer).toHaveScreenshot('footer-dark.png', {
      animations: 'disabled',
    });
  });

  test('should match mobile viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match tablet viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match header on scroll', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    const header = page.locator('header');
    await expect(header).toHaveScreenshot('header-scrolled.png', {
      animations: 'disabled',
    });
  });

  test('should match hover state on About cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Hover over first card
    const firstCard = about.locator('article, .MuiPaper-root').first();
    await firstCard.hover();
    await page.waitForTimeout(200);

    await expect(firstCard).toHaveScreenshot('about-card-hover.png', {
      animations: 'disabled',
    });
  });

  test('should match theme toggle button states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const themeToggle = page.locator('[aria-label*="toggle theme"]');

    // System mode icon (default)
    await expect(themeToggle).toHaveScreenshot('theme-toggle-system.png', {
      animations: 'disabled',
    });

    // Switch to light mode
    await themeToggle.click();
    await page.waitForTimeout(200);
    await page.getByText('Light').click();
    await page.waitForTimeout(300);

    // Light mode icon
    await expect(themeToggle).toHaveScreenshot('theme-toggle-light.png', {
      animations: 'disabled',
    });

    // Switch to dark mode
    await themeToggle.click();
    await page.waitForTimeout(200);
    await page.getByText('Dark').click();
    await page.waitForTimeout(300);

    // Dark mode icon
    await expect(themeToggle).toHaveScreenshot('theme-toggle-dark.png', {
      animations: 'disabled',
    });
  });
});
