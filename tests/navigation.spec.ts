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
      ['Interests', '#interests'],
      ['Journey', '#journey'],
      ['Experience', '#experience'],
      ['Contact', '#contact'],
    ]) {
      await followNavLink(page, name, isMobile);
      await expect(page.locator(id)).toBeInViewport();
    }
  });

  test('the hero buttons lead to the interests and contact sections', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'What I care about' }).click();
    await expect(page).toHaveURL(/\/#interests$/);
    await expect(page.locator('#interests')).toBeInViewport();

    await page.goto('/');
    await page.getByRole('main').getByRole('link', { name: 'Get in touch' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('old case study links land on the home page', async ({ page }) => {
    await page.goto('/work/ai-adoption');

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Fast, clear products.');
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

      for (const path of ['/', '/no-such-page']) {
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow, `${path} at ${viewport.width}px`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test.describe('What I care about', () => {
  test('lists the six interests', async ({ page }) => {
    await page.goto('/');

    const items = page.getByTestId('interest-list').getByRole('listitem');
    await expect(items).toHaveCount(6);
    await expect(page.getByTestId('interest-list')).toContainText('Great user experiences');
    await expect(page.getByTestId('interest-list')).toContainText('AI, used on purpose');
  });
});

test.describe('The route here', () => {
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

test.describe('Delivery loop', () => {
  test('a stage opens to show the belief behind it, and closes again', async ({ page }) => {
    await page.goto('/');

    const build = page.getByTestId('loop-stage-build');
    await expect(build).toHaveAttribute('aria-expanded', 'false');

    await build.click();
    await expect(build).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('Let the tools do the typing.')).toBeVisible();

    // Opening another stage closes the first.
    await page.getByTestId('loop-stage-measure').click();
    await expect(build).toHaveAttribute('aria-expanded', 'false');

    await page.getByTestId('loop-stage-measure').click();
    await expect(page.getByTestId('loop-stage-measure')).toHaveAttribute('aria-expanded', 'false');
  });

  test('running the loop steps through every stage and then offers another round', async ({
    page,
  }) => {
    await page.goto('/');

    const run = page.getByTestId('loop-run');
    await expect(run).toHaveText('Run the loop');

    await run.click();
    await expect(run).toHaveText('Stop');
    await expect(page.getByTestId('loop-stage-design')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByTestId('loop-stage-measure')).toHaveAttribute('aria-expanded', 'true', {
      timeout: 8000,
    });
    await expect(run).toHaveText('Run it again', { timeout: 8000 });
  });

  test('the loop can be stopped part way', async ({ page }) => {
    await page.goto('/');

    const run = page.getByTestId('loop-run');
    await run.click();
    await run.click();
    await expect(run).toHaveText('Run the loop');
  });
});

test.describe('Page speed', () => {
  test('reports live numbers for this visit', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('metric-load')).toContainText(/\d+\.\d+ s/);
    await expect(page.getByTestId('metric-paint')).toContainText(/\d+\.\d+ s/);
    await expect(page.getByTestId('metric-shift')).toContainText(/\d\.\d\d/);
    await expect(page.getByTestId('metric-weight')).toContainText(/kB|MB|From cache/);
  });
});

test.describe('Keyboard shortcuts', () => {
  /** Opens the page and waits until the shortcut listener is attached. */
  const openWithShortcuts = async (page: Page, state: 'on' | 'off' = 'on') => {
    await page.goto('/');
    await expect(page.locator('body')).toHaveAttribute('data-shortcuts', state);
  };

  test('number keys jump to sections', async ({ page }) => {
    await openWithShortcuts(page);

    await page.keyboard.press('2');
    await expect(page.locator('#journey')).toBeInViewport();

    await page.keyboard.press('4');
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('T moves through the theme settings', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await openWithShortcuts(page);

    // system -> light -> dark
    await page.keyboard.press('t');
    await page.keyboard.press('t');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(11, 30, 35)');
  });

  test('? opens the list, and the shortcuts can be switched off', async ({ page }) => {
    await openWithShortcuts(page);

    await page.keyboard.press('?');
    const dialog = page.getByRole('dialog', { name: 'Keyboard shortcuts' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByTestId('shortcut-list')).toContainText('Go to contact');

    await dialog.getByLabel('Use single-key shortcuts').uncheck();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();

    await page.keyboard.press('4');
    await expect(page).not.toHaveURL(/#contact$/);

    // The choice survives a reload.
    await page.reload();
    await expect(page.locator('body')).toHaveAttribute('data-shortcuts', 'off');
    await page.keyboard.press('2');
    await expect(page).not.toHaveURL(/#journey$/);
  });
});
