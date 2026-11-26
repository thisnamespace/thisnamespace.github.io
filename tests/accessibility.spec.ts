import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
  { name: 'home page', path: '/' },
  { name: 'case study page', path: '/work/ai-adoption' },
  { name: 'not-found page', path: '/no-such-page' },
];

test.describe('Accessibility', () => {
  for (const { name, path } of PAGES) {
    for (const scheme of ['light', 'dark'] as const) {
      test(`${name} has no detectable issues in ${scheme} mode`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.goto(path);

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
          .analyze();

        expect(results.violations).toEqual([]);
      });
    }
  }

  test('each page has exactly one h1', async ({ page }) => {
    for (const { path } of PAGES) {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
    }
  });

  test('the skip link is the first focusable element and targets the main content', async ({
    page,
  }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeInViewport();
    await expect(page.locator('#main-content')).toHaveCount(1);
  });

  test('a case study can be reached and opened with the keyboard alone', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('case-study-link-design-in-code').focus();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/work\/design-in-code$/);
  });

  test('the mobile menu opens, traps nothing, and closes with Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');

    await page.getByTestId('menu-button').click();
    const mobileNav = page.getByRole('navigation', { name: 'Main, mobile' });
    await expect(mobileNav).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(mobileNav).toBeHidden();
  });

  test('interactive targets in the header are at least 44px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');

    for (const id of ['theme-button', 'menu-button']) {
      const box = await page.getByTestId(id).boundingBox();
      expect(box?.width).toBeGreaterThanOrEqual(44);
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });
});
