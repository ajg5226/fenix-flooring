import { test, expect } from '@playwright/test';

const FLYER_URLS = [
  {
    label: 'commercial flyer',
    path: '/contact/?utm_source=flyer&utm_medium=print&utm_campaign=flyer_2026_02_commercial&utm_content=qr',
    campaign: 'flyer_2026_02_commercial',
  },
  {
    label: 'residential flyer',
    path: '/contact/?utm_source=flyer&utm_medium=print&utm_campaign=flyer_2026_02_residential&utm_content=qr',
    campaign: 'flyer_2026_02_residential',
  },
];

for (const url of FLYER_URLS) {
  test.describe(`${url.label} QR URL`, () => {
    test('loads the Contact page (HTTP 200)', async ({ page }) => {
      const response = await page.goto(url.path, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toContainText('Contact');
    });

    test('preserves all UTM params in the URL', async ({ page }) => {
      await page.goto(url.path, { waitUntil: 'domcontentloaded' });

      const search = new URL(page.url()).searchParams;
      expect(search.get('utm_source')).toBe('flyer');
      expect(search.get('utm_medium')).toBe('print');
      expect(search.get('utm_campaign')).toBe(url.campaign);
      expect(search.get('utm_content')).toBe('qr');
    });

    test('quote form is visible and functional', async ({ page }) => {
      await page.goto(url.path, { waitUntil: 'domcontentloaded' });

      const form = page.locator('form[name="quote-request"]');
      await expect(form).toBeVisible();
      await expect(form.locator('input[name="name"]')).toBeVisible();
      await expect(form.locator('input[name="email"]')).toBeVisible();
      await expect(form.locator('button[type="submit"]')).toBeVisible();
    });

    test('hidden UTM fields are populated from URL params', async ({ page }) => {
      await page.goto(url.path, { waitUntil: 'domcontentloaded' });

      const form = page.locator('form[name="quote-request"]');
      await expect(form.locator('input[name="utm_source"]')).toHaveValue('flyer');
      await expect(form.locator('input[name="utm_medium"]')).toHaveValue('print');
      await expect(form.locator('input[name="utm_campaign"]')).toHaveValue(url.campaign);
      await expect(form.locator('input[name="utm_content"]')).toHaveValue('qr');
    });

    test('canonical tag does not include UTM params', async ({ page }) => {
      await page.goto(url.path, { waitUntil: 'domcontentloaded' });

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).not.toContain('utm_');
    });
  });
}
