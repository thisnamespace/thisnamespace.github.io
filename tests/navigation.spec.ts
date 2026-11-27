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

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('this.page is undefined');
    await page.getByRole('link', { name: 'Go to the home page' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('the theme button moves through the settings and the choice is remembered', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const button = page.getByTestId('theme-button');
    await expect(button).toHaveAttribute('data-theme-setting', 'system');

    await button.click();
    await expect(button).toHaveAttribute('data-theme-setting', 'light');

    await button.click();
    await expect(button).toHaveAttribute('data-theme-setting', 'dark');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(10, 26, 21)');

    await page.reload();
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(10, 26, 21)');
    await expect(button).toHaveAttribute('data-theme-setting', 'dark');

    await button.click();
    await expect(button).toHaveAttribute('data-theme-setting', 'system');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(245, 243, 236)');
  });

  test('a saved dark theme is applied before the page paints', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('themePreference', 'dark'));
    await page.goto('/', { waitUntil: 'commit' });

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
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
  test('reports live numbers for this visit', async ({ page, browserName }) => {
    await page.goto('/');

    // Firefox and Safari don't measure layout shift, so the readout says so in place of a
    // number. Chromium measures everything, so there every figure must be a number.
    const unsupported = 'Not reported by this browser';
    const orUnsupported = (pattern: RegExp) =>
      browserName === 'chromium' ? pattern : new RegExp(`${pattern.source}|${unsupported}`);

    await expect(page.getByTestId('metric-load')).toContainText(/\d+\.\d+ s/);
    await expect(page.getByTestId('metric-paint')).toContainText(orUnsupported(/\d+\.\d+ s/));
    await expect(page.getByTestId('metric-shift')).toContainText(orUnsupported(/\d\.\d\d/));
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
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(10, 26, 21)');
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

test.describe('Pre-built HTML', () => {
  test('the page is readable with JavaScript switched off', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    const response = await page.goto('/');
    const html = (await response?.text()) ?? '';
    test.skip(!html.includes('data-page="home"'), 'Only the production build is pre-built.');

    await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(
      'Fast, clear products. AI adopted on purpose.'
    );
    await expect(page.getByTestId('interest-list').getByRole('listitem')).toHaveCount(6);
    await expect(page.getByTestId('brand-list').getByRole('listitem')).toHaveCount(10);
    await context.close();
  });

  test('a missing page answers with a 404 status and the not-found page', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    const html = (await response?.text()) ?? '';
    test.skip(!html.includes('data-page="not-found"'), 'Only the production build is pre-built.');

    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle('Page not found | Michael Day');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('this.page is undefined');
  });
});

test.describe('Living headline', () => {
  test('locks each letter width so nothing moves, then comes alive', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toHaveClass(/is-live/);
    const unlocked = await heading.locator('.headline__letter:not([style*="width"])').count();
    expect(unlocked).toBe(0);
  });

  test('stays still when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    await expect(page.getByTestId('loop-run')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).not.toHaveClass(/is-live/);
  });
});

test.describe('Clean start', () => {
  for (const path of ['/', '/no-such-page']) {
    test(`${path} loads without script errors or hydration warnings`, async ({ page }) => {
      const problems: string[] = [];
      page.on('pageerror', (error) => problems.push(error.message));
      page.on('console', (message) => {
        // A 404 for the missing page itself is expected and is not a script problem.
        if (message.type() === 'error' && !message.text().includes('404')) {
          problems.push(message.text());
        }
      });

      await page.goto(path);
      await expect(page.locator('body')).toHaveAttribute('data-shortcuts', 'on');

      expect(problems).toEqual([]);
    });
  }
});

test.describe('Things I have built', () => {
  test('lists both projects with links that open safely in a new tab', async ({ page }) => {
    await page.goto('/');

    const list = page.getByTestId('built-list');
    await expect(list.getByRole('listitem')).toHaveCount(2);
    await expect(list.getByRole('link', { name: 'ScrollObserver on npm' })).toHaveAttribute(
      'href',
      'https://www.npmjs.com/package/@thisnamespace/scrollobserver'
    );
    for (const link of await list.getByRole('link').all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});

test.describe('Away from work', () => {
  test('shows the rugby line and the three groups of places', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#away')).toContainText(
      'every World Cup final South Africa has played in'
    );
    await expect(page.getByTestId('places-worked')).toContainText(
      'South Africa, United Kingdom, Australia'
    );
    await expect(page.getByTestId('places-work-trips')).toContainText('Germany, Portugal, India');
    await expect(page.getByTestId('places-travelled')).toContainText('Japan');
  });
});

test.describe('The dot follows you', () => {
  test('the menu marks the section being read, and nothing at the top of the page', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'The inline menu only shows on wide screens.');
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Main', exact: true });
    await expect(nav.locator('[aria-current]')).toHaveCount(0);

    await page.evaluate(() =>
      document.querySelector('#journey')?.scrollIntoView({ block: 'start' })
    );
    await expect(nav.getByRole('link', { name: 'Journey' })).toHaveAttribute(
      'aria-current',
      'location'
    );
    await expect(nav.locator('[aria-current]')).toHaveCount(1);
  });

  test('the footer shows the same braces logo as the header', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.site-header svg.logo')).toHaveCount(1);
    await expect(page.locator('.site-footer svg.logo')).toHaveCount(1);
  });
});

test.describe('Security headers', () => {
  test('every page is sent with a content policy and the standard protections', async ({
    page,
  }) => {
    const response = await page.goto('/');
    const html = (await response?.text()) ?? '';
    test.skip(!html.includes('data-page="home"'), 'Only the production server sets headers.');

    const headers = response?.headers() ?? {};
    const policy = headers['content-security-policy'] ?? '';
    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toMatch(/script-src 'self' 'sha256-[^']+'/);
    expect(policy).not.toContain("script-src 'self' 'unsafe-inline'");
    expect(headers['strict-transport-security']).toContain('max-age=');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });

  test('the server config is not readable from outside', async ({ request }) => {
    const home = await (await request.get('/')).text();
    test.skip(!home.includes('data-page="home"'), 'Only the production server has a config file.');

    expect((await request.get('/serve.json')).status()).toBe(404);
    expect((await request.get('/serve.build.json')).status()).toBe(404);
  });
});
