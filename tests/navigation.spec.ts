import { test, expect, type Page } from '@playwright/test';

/** Follows a main-nav link, going through the drawer on small screens. */
const followNavLink = async (page: Page, name: string, isMobile: boolean) => {
  if (isMobile) {
    await page.getByTestId('menu-button').click();
    await page
      .getByRole('navigation', { name: 'Main, mobile' })
      .getByRole('link', { name })
      .click();
  } else {
    await page
      .getByRole('navigation', { name: 'Main', exact: true })
      .getByRole('link', { name })
      .click();
  }
};

test.describe('Navigation', () => {
  test('main nav links scroll to their sections', async ({ page, isMobile }) => {
    await page.goto('/');

    for (const [name, id] of [
      ['Work', '#work'],
      ['Approach', '#approach'],
      ['Experience', '#experience'],
      ['Contact', '#contact'],
    ]) {
      await followNavLink(page, name, isMobile);
      await expect(page.locator(id)).toBeInViewport();
    }
  });

  test('a case study opens from the home page and links back to the work list', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByTestId('case-study-link-ai-adoption').click();
    await expect(page).toHaveURL(/\/work\/ai-adoption$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Rolling out AI');
    await expect(page).toHaveTitle(/Rolling out AI/);

    await page.getByRole('link', { name: 'All work' }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.locator('#work')).toBeInViewport();
  });

  test('case studies link to each other', async ({ page }) => {
    await page.goto('/work/ai-adoption');

    await page.getByTestId('next-case-study').click();
    await expect(page).toHaveURL(/\/work\/design-in-code$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('design team');
  });

  test('nav links work from a case study page', async ({ page, isMobile }) => {
    await page.goto('/work/agents-and-skills');

    await followNavLink(page, 'Contact', isMobile);
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('an unknown address shows the not-found page', async ({ page }) => {
    await page.goto('/no-such-page');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('That page does not exist.');
    await page.getByRole('link', { name: 'Go to the home page' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('the theme can be changed and the choice is remembered', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('theme-button').click();
    await page.getByRole('menuitem', { name: 'Dark' }).click();
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(11, 30, 35)');

    await page.reload();
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(11, 30, 35)');

    await page.getByTestId('theme-button').click();
    await page.getByRole('menuitem', { name: 'Light' }).click();
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(241, 245, 243)');
  });

  test('contact links point at the right places', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('contact-email')).toHaveAttribute(
      'href',
      'mailto:michael@thisnamespace.com'
    );
    await expect(page.locator('#contact').getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      /linkedin\.com\/in\/michael-day/
    );
  });
});

test.describe('Responsive layout', () => {
  for (const viewport of [
    { name: 'phone', width: 360, height: 740 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ]) {
    test(`no horizontal scrolling on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const path of ['/', '/work/ai-adoption']) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow, `${path} at ${viewport.width}px`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe('Front-end craft section', () => {
  test('shows the technology path in order', async ({ page }) => {
    await page.goto('/');

    const steps = page.getByTestId('path-technology').getByRole('listitem');
    await expect(steps).toHaveCount(4);
    await expect(steps.first()).toContainText('J2ME');
    await expect(steps.last()).toContainText('React');
  });

  test('shows the product path from brand work to one platform', async ({ page }) => {
    await page.goto('/');

    const steps = page.getByTestId('path-products').getByRole('listitem');
    await expect(steps).toHaveCount(4);
    await expect(steps.first()).toContainText('Brand sites and apps');
    await expect(steps.nth(2)).toContainText('SaaS with CI/CD');
    await expect(steps.last()).toContainText('One cohesive platform');
  });
});

test.describe('Brands', () => {
  test('lists the brands worked with, including current and past employers', async ({ page }) => {
    await page.goto('/');

    const brands = page.getByTestId('brand-list').getByRole('listitem');
    await expect(brands).toHaveCount(10);
    for (const name of ['TeamViewer', '1E', 'Tesco', 'NHS']) {
      await expect(page.getByTestId('brand-list')).toContainText(name);
    }
  });
});
